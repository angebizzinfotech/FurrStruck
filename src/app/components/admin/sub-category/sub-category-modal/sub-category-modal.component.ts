import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../service/admin/api.service';
import {HttpService} from '../../../../service/admin/http.service';
import {SubCategoryService} from '../../../../service/admin/sub-category.service';
import {CommonService} from '../../../../service/admin/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-sub-category-modal',
    templateUrl: './sub-category-modal.component.html',
    styleUrls: ['./sub-category-modal.component.css']
})
export class SubCategoryModalComponent implements OnInit {
    sCId: number;
    categoryList = [];
    form = new FormGroup({
        catId: new FormControl(''),
        subcategoryName: new FormControl('')
    });
    constructor(private subCategoryService: SubCategoryService,
                private api: ApiService,
                private http: HttpService,
                private route: ActivatedRoute,
                private router: Router,
                private spinner: NgxSpinnerService,
                private commonService: CommonService) {

                this.route.params.subscribe(params => {
                    this.sCId = Number(params.id);
                });
    }

    ngOnInit() {
        this.getCategory();
    }

    getCategory() {
        this.http.postRequest(this.api.getCategoryList, {}).subscribe(
            res => {
                const result: any = res;
                this.spinner.hide();
                this.categoryList = result.data;
                if (this.sCId > 0) {
                    this.getSubcategory();
                }
            }
        );
    }

    getSubcategory() {
        this.http.putRequest(this.api.getSubCatDetail + this.sCId, {}).subscribe(
            res => {
                const result: any = res;
                this.spinner.hide();
                this.form.patchValue(result.data[0]);
            }
        );
    }

    save(formData) {
        if (this.sCId === 0) {
            this.http.postRequest(this.api.addSubCategory, formData).subscribe(
                res => {
                    const result: any = res;
                    this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                    this.router.navigate(['admin/sub-category']);
                }
            );
        } else {
            this.http.putRequest(this.api.editSubCategory + this.sCId, formData).subscribe(
                res => {
                    const result: any = res;
                    if(result.status)
                    {
                        this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                        this.router.navigate(['admin/sub-category']);
                    
                    } else {
                        this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
                    }
                    
                }
            );
        }
    }

}
