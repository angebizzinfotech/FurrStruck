import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ManufacturerService} from '../../../service/admin/manufacturer.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpService} from '../../../service/admin/http.service';
import {ApiService} from '../../../service/admin/api.service';
import {CommonService} from '../../../service/admin/common.service';
import {ManufacturerModalComponent} from './manufacturer-modal/manufacturer-modal.component';

@Component({
    selector: 'app-manufacturer',
    templateUrl: './manufacturer.component.html',
    styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
    displayedColumns: string[] = ['manufacturerName', 'spName', 'spEmail', 'vendorName', 'action'];
    list = [];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private manufeacturerService: ManufacturerService,
                public dialog: MatDialog,
                public spinner: NgxSpinnerService,
                private api: ApiService,
                private http: HttpService,
                private commonService: CommonService) {
    }

    ngOnInit() {
        this.getMenufecturerList();
        this.getvVendorlist();
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
        this.manufeacturerService.mode = 1;
        const dialogRef = this.dialog.open(ManufacturerModalComponent, {
            width: '400px',
            backdropClass: 'masterModalPopup',
            data: {mode: 1}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.spinner.hide();
                this.getMenufecturerList();
            } else if (result === false) {
                this.spinner.hide();
            }
        });
    }

    getMenufecturerList() {
        this.list = [];
        this.http.putRequest(this.api.getManafecturerList, {}).subscribe(
            res => {
                const result: any = res;
                if (result.status) {
                    this.list = result.data;
                    this.loadData();
                } else {
                    this.spinner.hide();
                }
            }
        );
    }

    getvVendorlist() {
        this.http.postRequest(this.api.getVendorList, {}).subscribe(
            res => {
                const result: any = res;
                if (result.status) {
                    this.manufeacturerService.vendorList = result.data;
                } else {
                    this.spinner.hide();
                    this.commonService.openSnackBar(result.message, 'Success', 'danger-snackbar');
                }
            }
        );
    }

    edit(obj) {
        this.manufeacturerService.obj = obj;
        this.manufeacturerService.mode = 2;
        const dialogRef = this.dialog.open(ManufacturerModalComponent, {
            width: '400px',
            backdropClass: 'masterModalPopup',
            data: {mode: 2}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.spinner.hide();
                this.getMenufecturerList();
            } else if (result === false) {
                this.spinner.hide();
            }
        });
    }

    delete(id) {
        if (!confirm('Are you sure you want to delete!!!')) {
            return false;
        }
        this.http.putRequest(this.api.deleteManafecturer + id, {}).subscribe(
            res => {
                const result: any = res;
                if (result.status) {
                    this.spinner.hide();
                    this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                    this.getMenufecturerList();
                } else {
                    this.spinner.hide();
                    this.commonService.openSnackBar(result.message, 'Success', 'danger-snackbar');
                }
            }
        );
    }
}
