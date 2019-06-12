import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../service/admin/api.service';
import {HttpService} from '../../../../service/admin/http.service';
import {CommonService} from '../../../../service/admin/common.service';
import {ManufacturerService} from '../../../../service/admin/manufacturer.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-manufacturer-modal',
    templateUrl: './manufacturer-modal.component.html',
    styleUrls: ['./manufacturer-modal.component.css']
})
export class ManufacturerModalComponent implements OnInit {
    [x: string]: any;

    mId : any;

    form = new FormGroup({
        vId: new FormControl(''),
        manufacturerName: new FormControl(''),
        spName: new FormControl(''),
        spEmail: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    });

    constructor(private manufacturerService: ManufacturerService,
                private api: ApiService,
                private http: HttpService,
                private commonService: CommonService,
                private router : Router,
                private route : ActivatedRoute,
                private spinner: NgxSpinnerService) {


                this.route.params.subscribe( params => {
                    this.mId = Number(params.id);
                });
    }

    ngOnInit() {
        this.getVendor();
        this.form.reset();
        if (this.manufacturerService.mode === 2) {
            this.form.patchValue(this.manufacturerService.obj);
        }
    }

    save(formData) {
        if (this.mId === 0) {

            this.http.postRequest(this.api.addManafecturer, formData).subscribe(
                res => {
                    const result : any = res;
                    if(result.status)
                    {
                        this.spinner.hide();
                        this.commonService.openSnackBar(result.message,'Success','success-snackbar');
                        this.router.navigate(['admin/manufacturer']);
                    }
                    else
                    {
                        this.commonService.openSnackBar(result.message, 'Close','danger-snackbar');
                    }
                }
            );
        } else {
            this.http.putRequest(this.api.editManafecturer + this.mId, formData).subscribe(
                res => {
                    const result: any = res;
                    if (result.status) {
                        this.commonService.snackBar = 1;
                        this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                        this.router.navigate(['admin/manufacturer']);
                    } else {
                        this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
                    }
                }
            );
        }
    }

    getVendor(){
        this.http.postRequest(this.api.getVendorList, {}).subscribe(res => {
            const result : any = res;
            this.spinner.hide();
            if(result.status)
            {
                this.manufacturerService.vendorList = result.data;
            }
            if (this.mId > 0) {
                this.getManufacturerDetails();
            }
        })
    }

    getManufacturerDetails(){
        this.http.putRequest(this.api.getManufacturerById + this.mId, {}).subscribe(res => {
            const result : any = res;
            this.spinner.hide();
            this.form.patchValue(result.data[0]);
        }); 
    }

}
