import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdminAuthService} from '../../helper/admin-auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    baseUrl = 'http://ec2-3-15-88-58.us-east-2.compute.amazonaws.com:8000/';
    constructor(private http: HttpClient, private authService: AdminAuthService,
                public spinner: NgxSpinnerService) {
    }

    getRequest(url) {
        const baseUrl = this.checkPort(url);
        return this.http.get(baseUrl);
    }

    postRequest(url, data) {
        this.spinner.show();
        if (this.authService.getToken()) {
            data['authKey'] = this.authService.getToken();
            data['loginuserId'] = this.authService.geLoginUserId();
        }
        const baseUrl = this.checkPort(url);
        return this.http.post(baseUrl, data);
    }

    putRequest(url, data) {
        this.spinner.show();
        if (this.authService.getToken()) {
            data['authKey'] = this.authService.getToken();
            data['loginuserId'] = this.authService.geLoginUserId();
        }
        const baseUrl = this.checkPort(url);
        return this.http.put(baseUrl, data);
    }

    deleteRequest(url, data) {
        this.spinner.show();
        if (this.authService.getToken()) {
            data['authKey'] = this.authService.getToken();
            data['loginuserId'] = this.authService.geLoginUserId();
        }
        const baseUrl = this.checkPort(url);
        return this.http.delete(baseUrl);
    }

    checkPort(url) {
        return this.baseUrl + url;
    }
}
