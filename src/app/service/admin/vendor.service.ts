import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VendorService {
    mode = 0;
    userRoleList = [];
    obj: any;

    constructor() {
    }
}
