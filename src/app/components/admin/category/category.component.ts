import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../../service/admin/api.service';
import {HttpService} from '../../../service/admin/http.service';
import {CategoryService} from '../../../service/admin/category.service';
import {CommonService} from '../../../service/admin/common.service';
import {CategoryModalComponent} from './category-modal/category-modal.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    displayedColumns: string[] = ['categoryName', 'action'];
    list = [];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private categoryService: CategoryService,
                public dialog: MatDialog,
                public spinner: NgxSpinnerService,
                private api: ApiService,
                private http: HttpService,
                private router: Router,
                private commonService: CommonService) {
    }

    ngOnInit() {
        this.getCategoryList();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    loadData() {
        setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
        });
    }

    addNew() {
        this.categoryService.mode = 1;
        const dialogRef = this.dialog.open(CategoryModalComponent, {
            width: '400px',
            backdropClass: 'masterModalPopup',
            data: {mode: 1}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.spinner.hide();
                this.getCategoryList();
            } else if (result === false) {
                this.spinner.hide();
            }
        });
    }

    getCategoryList() {
        this.list = [];
        this.http.postRequest(this.api.getCategoryList, {}).subscribe(
            res => {
                const result: any = res;
                console.log(result);
                if (result.status) {
                    this.list = result.data;
                    this.loadData();
                } else {
                    this.spinner.hide();
                }
            }
        );
    }

    edit(obj) {
        this.categoryService.obj = obj;
        this.categoryService.mode = 2;
        const dialogRef = this.dialog.open(CategoryModalComponent, {
            width: '400px',
            backdropClass: 'masterModalPopup',
            data: {mode: 2}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.spinner.hide();
                this.getCategoryList();
            } else if (result === false) {
                this.spinner.hide();
            }
        });
    }

    delete(id) {
        if (!confirm('Are you sure you want to delete!!!')) {
            return false;
        }
        this.http.putRequest(this.api.deleteCategory + id, {}).subscribe(
            res => {
                const result: any = res;
                if (result.status) {
                    this.spinner.hide();
                    this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                    this.getCategoryList();
                } else {
                    this.spinner.hide();
                    this.commonService.openSnackBar(result.message, 'Success', 'danger-snackbar');
                }
            }
        );
    }

    redirect(id) {
        this.router.navigate(['admin/sub-category/' + btoa(id)]);
    }
}
