import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../service/admin/api.service';
import {HttpService} from '../../service/admin/http.service';
import {Router} from '@angular/router';
import {CommonService} from '../../service/admin/common.service';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
    errorMsg = ''
    constructor(private spinner: NgxSpinnerService,
                private api: ApiService, private router: Router,
                private http: HttpService,
                private commonService: CommonService) {
    }

    ngOnInit() {
        if (localStorage.getItem('token')) {
            this.router.navigate(['/admin/dashboard']);
        }
    }

    login(formData) {
        // this.spinner.show();
        this.http.postRequest(this.api.login, formData).subscribe(res => {
            const result: any = res;
            if (result.status) {
                localStorage.setItem('token', result.data[0].authKey);
                localStorage.setItem('role', btoa(result.data[0].userRole));
                localStorage.setItem('uid', btoa(result.data[0].uId));
                localStorage.setItem('user', 'admin');
                this.spinner.hide();
                this.commonService.openSnackBar(result.message, 'Success', 'success-snackbar');
                this.router.navigate(['/admin/user']);
            } else {
                this.spinner.hide();
                this.errorMsg = result.message;
            }
        });
    }
}
