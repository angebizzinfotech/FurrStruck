import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../../service/admin/api.service';
import {HttpService} from '../../../service/admin/http.service';
import {VendorService} from '../../../service/admin/vendor.service';
import {VendorModalComponent} from './vendor-modal/vendor-modal.component';
import {CommonService} from '../../../service/admin/common.service';

@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
    displayedColumns: string[] = ['vendorName', 'contactPersonName', 'contactPersonEmail', 'action'];
    list = [];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(public dialog: MatDialog,
                public spinner: NgxSpinnerService,
                private api: ApiService,
                private http: HttpService,
                private vendorService: VendorService,
                private commonService: CommonService) {
    }

    ngOnInit() {
        this.getVendorList();
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

    getVendorList() {
        this.list = [];
        this.http.postRequest(this.api.getVendorList, {}).subscribe(
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

    addNew() {
        this.vendorService.mode = 1;
        const dialogRef = this.dialog.open(VendorModalComponent, {
            width: '400px',
            backdropClass: 'masterModalPopup',
            data: {mode: 1}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.spinner.hide();
                this.getVendorList();
            } else if (result === false) {
                this.spinner.hide();
            }
        });
    }

    edit(obj) {
        this.vendorService.obj = obj;
        this.vendorService.mode = 2;
        const dialogRef = this.dialog.open(VendorModalComponent, {
            width: '400px',
            backdropClass: 'masterModalPopup',
            data: {mode: 2}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.spinner.hide();
                this.getVendorList();
            } else if (result === false) {
                this.spinner.hide();
            }
        });
    }

    delete(id) {
        if (!confirm('Are you sure you want to delete')) {
            return false;
        }
        this.http.putRequest(this.api.deletevendor + id, {}).subscribe(
            res => {
                const result: any = res;
                if (result.status) {
                    this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                    this.spinner.hide();
                    this.getVendorList();
                } else {
                    this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
                    this.spinner.hide();
                }
            }
        )
    }
}
