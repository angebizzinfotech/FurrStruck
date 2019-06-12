import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../service/admin/api.service';
import {HttpService} from '../../../../service/admin/http.service';
import {CommonService} from '../../../../service/admin/common.service';
import {CategoryService} from '../../../../service/admin/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-category-modal',
    templateUrl: './category-modal.component.html',
    styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {

    cId : any;

    form = new FormGroup({
        categoryName: new FormControl('')
    });

    constructor(private route : ActivatedRoute,
                private router : Router,
                private categoryService: CategoryService,
                private api: ApiService,
                private http: HttpService,
                private commonService: CommonService,
                private spinner : NgxSpinnerService) {

                this.route.params.subscribe( params => {
                    this.cId = Number(params.id);
                });
    }

    ngOnInit() {
        this.form.reset();
        if (this.categoryService.mode === 2) {
            this.form.patchValue(this.categoryService.obj);
        }

        if(this.cId > 0)
        {
            this.getCategoryDetail();
        }
    }

    save(formData) {
        if (this.cId === 0) {
            this.http.postRequest(this.api.addCategory, formData).subscribe(
                res => {
                    const result: any = res;
                    if (result.status) {
                        this.commonService.snackBar = 1;
                        this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                        this.router.navigate(['admin/category']);
                    } else {
                        
                        this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
                    }
                }
            );
        } else {
            this.http.putRequest(this.api.editCategory + this.cId, formData).subscribe(
                res => {
                    const result: any = res;
                    if (result.status) {
                        this.commonService.snackBar = 1;
                        this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                        this.router.navigate(['admin/category']);
                    } else {
                        
                        this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
                    }
                }
            );
        }
    }

    getCategoryDetail(){

        this.http.putRequest(this.api.getCategoryDetail + this.cId, {}).subscribe(res => {
            const result : any = res;
            this.spinner.hide();
            this.form.patchValue(result.data[0]);
        });

    }
}
