import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../../service/admin/api.service';
import {HttpService} from '../../../service/admin/http.service';
import {CommonService} from '../../../service/admin/common.service';
import {SubCategoryService} from '../../../service/admin/sub-category.service';

@Component({
    selector: 'app-sub-category',
    templateUrl: './sub-category.component.html',
    styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
    displayedColumns: string[] = ['categoryName', 'subcategoryName', 'action'];
    list = [];
    catList = [];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private subCategoryService: SubCategoryService,
                public dialog: MatDialog,
                public spinner: NgxSpinnerService,
                private api: ApiService,
                private http: HttpService,
                private commonService: CommonService) {
    }

    ngOnInit() {
        this.getSubCategoryList();
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

    getSubCategoryList() {
        this.list = [];
        this.http.postRequest(this.api.getSubCategoryList, {}).subscribe(
            res => {
                const result: any = res;
                this.list = result.data;
                this.loadData();
            }
        );
    }

    delete(id) {
        if (!confirm('Are you sure you want to delete!!!')) {
            return false;
        }
        this.http.putRequest(this.api.deleteSubCategory + id, {}).subscribe(
            res => {
                const result: any = res;
                if (result.status) {
                    this.spinner.hide();
                    this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                    this.getSubCategoryList();
                } else {
                    this.spinner.hide();
                    this.commonService.openSnackBar(result.message, 'Success', 'danger-snackbar');
                }
            }
        );
    }
}
