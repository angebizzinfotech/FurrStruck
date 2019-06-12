import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig} from '@angular/material';
import {ProductService} from '../../../service/admin/product.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../../service/admin/api.service';
import {HttpService} from '../../../service/admin/http.service';
import {CommonService} from '../../../service/admin/common.service';
import { Router } from '@angular/router';
import { ProductViewModalComponent } from '../product/product-view-modal/product-view-modal.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    displayedColumns: string[] = ['productName', 'upc', 'category', 'subcategory', 'vendor', 'manufacturer', 'action'];
    list = [];
    searchForm = new FormGroup({
        petType: new FormControl(''),
        productName: new FormControl(''),
        upc: new FormControl(''),
    });
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private productService: ProductService,
                public dialog: MatDialog,
                public spinner: NgxSpinnerService,
                private api: ApiService,
                private http: HttpService,
                private commonService: CommonService,
                private router: Router) {
    }

    ngOnInit() {
        this.productService.productData = '';
    }

    getProductDetails(formData) {
        this.list = [];
        this.http.postRequest(this.api.getproductList, formData).subscribe(
            res => {
                const result: any = res;
                this.spinner.hide();
                this.list = result.data.products;
                this.loadData();
            }
        );
    }

    loadData() {
        setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
        });
    }

    delete(id) {
        if (!confirm('Are you sure you want to delete!!!')) {
            return false;
        }
        this.http.putRequest(this.api.deleteProduct + id, {}).subscribe(
            res => {
                const result: any = res;
                this.spinner.hide();
                this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                this.getProductDetails(this.searchForm.value);
            }
        );
    }

    viewProductDetail(obj) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        // this.http.putRequest(this.api.viewProduct + obj.pId, {}).subscribe(res => {
        //     const result : any = res;
        //     this.prodDetail = result.data;
        //     this.router.navigate(['admin/product/detail/' + obj.pId]);
        // });
        // console.log(this.prodDetail);
        const dialogRef = this.dialog.open(ProductViewModalComponent, {
            width: '500px',
            data : obj,
            backdropClass: 'masterModalPopup'
        });
        
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.spinner.hide();
            } else if (result === false) {
                this.spinner.hide();
            }
        });
    }
}
