import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../service/admin/api.service';
import {HttpService} from '../../../../service/admin/http.service';
import {CommonService} from '../../../../service/admin/common.service';
import {ProductService} from '../../../../service/admin/product.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {fadeInContent} from '@angular/material';

@Component({
    selector: 'app-product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

    pId: any;
    subCategory: any;
    Manufacturer: any;
    base64textString = [];
    fileStream = [];
    pImages = new FormArray([]);
    uniqueOrderList = [];
    mainUniqueOrderList = [];
    urls = new Array<string>();

    form = new FormGroup({
        catId: new FormControl(''),
        subcatId: new FormControl(''),
        vId: new FormControl(''),
        mId: new FormControl(''),
        productName: new FormControl(''),
        upc: new FormControl(''),
        size: new FormControl(''),
        unitWeight: new FormControl(''),
        qtyPerUnit: new FormControl(''),
        unitPrice: new FormControl(''),
        msrp: new FormControl(''),
        map: new FormControl(''),
        sellPrice: new FormControl(''),
        discount: new FormControl(''),
        unitsOnOrder: new FormControl(''),
        unitsInStock: new FormControl(''),
        reorderLevel: new FormControl(''),
        discountAvail: new FormControl(''),
        petType: new FormControl(''),
        direction: new FormControl(''),
        additionalDetails: new FormControl(''),
        waranty: new FormControl(''),
        moreInfo: new FormControl(''),
        productDescription: new FormControl(''),
        status: new FormControl(''),
        image: new FormControl(''),
        pImages: this.pImages
    });

    constructor(private route: ActivatedRoute,
                private productService: ProductService,
                private api: ApiService,
                private http: HttpService,
                private router: Router,
                private spinner: NgxSpinnerService,
                private commonService: CommonService) {

        this.route.params.subscribe(params => {
            this.pId = Number(params.id);
        });

    }

    ngOnInit() {
        console.log(this.pId);
        this.getCategoryDetails();

        if (this.productService.productData) {
            this.form.patchValue(this.productService.productData);
        }
    }

    getCategoryDetails() {
        this.http.postRequest(this.api.getCategoryList, {}).subscribe(
            res => {
                const result: any = res;
                this.spinner.hide();
                this.productService.categoryList = result.data;
                this.getVendorDetails();
            }
        );
    }

    getVendorDetails() {
        this.http.postRequest(this.api.getVendorList, {}).subscribe(
            res => {
                const result: any = res;
                this.spinner.hide();
                this.productService.vendorList = result.data;
                if (this.pId > 0) {
                    this.getAllSubCat();
                }
            }
        );
    }

    getAllSubCat() {
        this.http.postRequest(this.api.getSubCategoryList, {}).subscribe(res => {
            const result: any = res;
            this.spinner.hide();
            if (result.status) {
                this.subCategory = result.data;
            } else {
                this.subCategory = [];
            }
            if (this.pId > 0) {
                this.getProductDetail();
            }
        });
    }

    getProductDetail() {
        this.http.putRequest(this.api.viewProduct + this.pId, {}).subscribe(res => {
            const result: any = res;
            this.spinner.hide();
            this.form.patchValue(result.data);

            for (let i = 0; i < result.data.pImages.length; i++) {
                this.urls.push(null);
                this.base64textString.push(null);
                (<FormArray>this.form.get('pImages')).push(
                    new FormGroup({
                        piId: new FormControl(result.data.pImages[i].piId),
                        pId: new FormControl(result.data.pImages[i].pId),
                        imageAltTag: new FormControl(result.data.pImages[i].imageAltTag),
                        pImg: new FormControl(result.data.pImages[i].imageFileName),
                        imageOrder: new FormControl(result.data.pImages[i].imageOrder),
                        type: new FormControl(result.data.pImages[i].type),
                        orderNo: new FormControl(),
                        iId : new FormControl(1)
                    })
                );
            }
        });
    }

    save(formData) {
        if (this.pId === 0) {
            formData['pImages'] = this.getControlsValue();
            this.http.postRequest(this.api.addProduct, formData).subscribe(
                res => {
                    this.spinner.hide();
                    this.commonService.openSnackBar('Successfully inserted', 'Success', 'success-snackbar');
                    this.router.navigate(['admin/product']);
                }
            );
        } else {
            this.http.putRequest(this.api.editProduct + this.pId, formData).subscribe(
                res => {
                    const result: any = res;
                    if (result.status) {
                        this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                        this.router.navigate(['admin/product']);
                    } else {
                        this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
                    }
                }
            );
        }
    }

    getSubcategory(e) {
        this.http.putRequest(this.api.getSubcategoryByCatId + e, {}).subscribe(
            res => {
                const result: any = res;
                this.spinner.hide();
                this.subCategory = result.data;
            }
        );
    }

    getManufacturer(e) {
        this.http.putRequest(this.api.getManufacturerByVidList + e, {}).subscribe(
            res => {
                const result: any = res;
                this.spinner.hide();
                this.Manufacturer = result.data;
            }
        );
    }

    getAllManufacturer() {
        this.http.putRequest(this.api.getManafecturerList, {}).subscribe(res => {
            const result: any = res;
            this.spinner.hide();
            this.Manufacturer = result.data;
        });
    }

    deleteImages(pIid) {

        this.http.putRequest(this.api.deletProductImages + pIid, {}).subscribe(res => {
            const result: any = res;
            if (result.status) {
                this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                this.router.navigate(['admin/product']);
            } else {
                this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
            }
        });
    }

    onUploadChange(evt: any) {
        for (let i = 0; i < evt.target.files.length; i++) {
            const ext = evt.target.files[i].name.substr(-3).toLowerCase();
            if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
                alert('not an accepted file extension');
                this.form.controls['image'].setValue('');
                return false;
            }
        }
        this.fileStream = [];
        this.urlStream(evt.target.files);

        for (let i = 0; i < evt.target.files.length; i++) {
            const file = evt.target.files[i];
            this.fileStream.push(file);
            if (file) {
                const reader = new FileReader();
                reader.onload = this.handleReaderLoaded.bind(this);
                reader.readAsBinaryString(file);
            }
        }

        this.spinner.show();
        setTimeout(() => {

            for (let i = 0; i < this.fileStream.length; i++) {
                (<FormArray>this.form.get('pImages')).push(
                    new FormGroup({
                        piId: new FormControl(0),
                        pId: new FormControl(this.pId),
                        imageAltTag: new FormControl(this.fileStream[i].name),
                        pImg: new FormControl(this.base64textString[i]),
                        imageOrder: new FormControl(''),
                        type: new FormControl(this.fileStream[i].name.split('.')[1]),
                        orderNo: new FormControl(''),
                        iId : new FormControl(0)
                    })
                );
            }
            this.spinner.hide();
        }, 500);
    }

    urlStream(files) {
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.urls.push(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    handleReaderLoaded(e) {
        this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    }

    getControls() {
        return (<FormArray>this.form.get('pImages')).controls;
    }

    getControlsValue() {
        return <FormArray>this.form.controls.pImages.value;
    }

    updateFormAllocationArray() {
        return <FormArray>this.form.controls.pImages;
    }

    remove(i) {
        (<FormArray>this.form.get('pImages')).removeAt(i);
        this.urls.splice(i, 1);
        this.base64textString.splice(i, 1);
    }

    delete(id, i) {
        if (!confirm('Are you sure you want to delete!!!')) {
            return false;
        }
        this.http.postRequest(this.api.deletProductImages + id, {}).subscribe(res => {
            const result: any = res;
            (<FormArray>this.form.get('pImages')).removeAt(i);
            this.urls.splice(i, 1);
            this.base64textString.splice(i, 1);
        });
    }
}
