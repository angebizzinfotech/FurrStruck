import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ManufacturerService {
    mode = 0;
    vendorList = [];
    obj: any;
    constructor() {
    }
}
