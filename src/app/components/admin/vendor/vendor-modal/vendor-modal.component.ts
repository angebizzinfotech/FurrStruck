import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../service/admin/api.service';
import {HttpService} from '../../../../service/admin/http.service';
import {CommonService} from '../../../../service/admin/common.service';
import {VendorService} from '../../../../service/admin/vendor.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-vendor-modal',
    templateUrl: './vendor-modal.component.html',
    styleUrls: ['./vendor-modal.component.css']
})
export class VendorModalComponent implements OnInit {

    vId : any;
    list = [];
    form = new FormGroup({
        vendorName: new FormControl(''),
        contactPersonName: new FormControl(''),
        contactPersonEmail: new FormControl('', Validators.compose([Validators.email, Validators.required]))
    });

    constructor(private spinner : NgxSpinnerService,
                private vendorService: VendorService,
                private api: ApiService,
                private http: HttpService,
                private commonService: CommonService,
                private router : Router,
                private route : ActivatedRoute) {

                this.route.params.subscribe( params => {
                    this.vId = Number(params.id);
                });
    }

    ngOnInit() {
        this.form.reset();
        if (this.vendorService.mode === 2) {
            this.form.patchValue(this.vendorService.obj);
        }

        if(this.vId > 0)
        {
            this.getVendorDetail();
        }
    }

    save(formData) {
        if (this.vId == 0) {
            this.http.postRequest(this.api.saveVendor, formData).subscribe(
                res => {
                    const result : any = res;
                    if(result.status)
                    {
                        this.spinner.hide();
                        this.commonService.openSnackBar(result.message,'Success','success-snackbar');
                        this.router.navigate(['admin/vendor']);
                    }
                    else
                    {
                        this.commonService.openSnackBar(result.message, 'Close','danger-snackbar');
                    }
                }
            );
        } else {
            this.http.putRequest(this.api.editVendor + this.vId, formData).subscribe(
                res => {
                    const result: any = res;
                    if (result.status) {
                        this.commonService.snackBar = 1;
                        this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                        this.router.navigate(['admin/vendor']);
                    } else {
                        this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
                    }
                }
            );
        }
    }

    getVendorDetail(){
        this.http.putRequest(this.api.getVendorById + this.vId, {}).subscribe(res => {
            const result : any = res;
            this.spinner.hide();
            this.form.patchValue(result.data[0]);
        });
    }

}
