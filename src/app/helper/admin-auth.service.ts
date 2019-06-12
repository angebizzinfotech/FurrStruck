import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthService {
    roleNo: any;
    uid: any;
    constructor() {}

    getToken() {
        return localStorage.getItem('token');
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    getRoleNo() {
        this.roleNo = localStorage.getItem('role');
        return atob(this.roleNo);
    }

    geLoginUserId() {
        this.uid = localStorage.getItem('uid');
        return atob(this.uid);
    }
}
