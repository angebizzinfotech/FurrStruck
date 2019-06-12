import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/admin/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../service/admin/api.service';
import {HttpService} from '../../../../service/admin/http.service';
import {CommonService} from '../../../../service/admin/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

    uId: any;

    form = new FormGroup({
        firstName: new FormControl(''),
        userName: new FormControl(''),
        password: new FormControl(''),
        userRole: new FormControl('')
    });
    
    constructor(private userService: UserService,
                private api: ApiService,
                private http: HttpService,
                private commonService: CommonService,
                private spinner: NgxSpinnerService,
                private router: Router,
                private route: ActivatedRoute) {

                this.route.params.subscribe( params => {
                    this.uId = Number(params.id);
                });
    }

    ngOnInit() {
        this.getUserRole();
    }

    getUserRole() {
        this.http.postRequest(this.api.getUserRole, {}).subscribe(
            res => {
                const result: any = res;
                this.userService.userRoleList = result.data;
                this.spinner.hide();
                if (this.uId > 0) {
                    this.getuserDetails();
                }
            }
        );
    }

    getuserDetails() {
        this.http.putRequest(this.api.getuserById + this.uId, {}).subscribe(
            res => {
                const result: any = res;
                this.spinner.hide();
                this.form.patchValue(result.data[0]);
            }
        );
    }

    save(formData) {
        if (this.uId === 0) {
            this.http.postRequest(this.api.addUser, formData).subscribe(
                res => {
                    this.spinner.hide();
                    this.commonService.openSnackBar('Successfully inserted', 'Success', 'success-snackbar');
                    this.router.navigate(['admin/user']);
                }
            );
        } else {
            this.http.putRequest(this.api.editUser + this.uId, formData).subscribe(
                res => {
                    const result: any = res;
                    if (result.status) {
                        this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                        this.router.navigate(['admin/user']);
                    } else {
                        this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
                    }
                }
            );
        }
    }

    // save(formData) {
    //     if (this.userService.mode === 1) {
    //         this.http.postRequest(this.api.addUser, formData).subscribe(
    //             res => {
    //                 const result: any = res;
    //                 if (result.status) {
    //                     this.commonService.snackBar = 1;
    //                     this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
    //                     this.dialogRef.close(true);
    //                 } else {
    //                     this.dialogRef.close(false);
    //                     this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
    //                 }
    //             }
    //         );
    //     } else {
    //         this.http.putRequest(this.api.editUser + this.userService.obj.uId, formData).subscribe(
    //             res => {
    //                 const result: any = res;
    //                 if (result.status) {
    //                     this.commonService.snackBar = 1;
    //                     this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
    //                     this.dialogRef.close(true);
    //                 } else {
    //                     this.dialogRef.close(false);
    //                     this.commonService.openSnackBar(result.message, 'Close', 'danger-snackbar');
    //                 }
    //             }
    //         );
    //     }
    // }
}