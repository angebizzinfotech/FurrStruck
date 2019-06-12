import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    mode: number;
    obj: any;
    categoryList = [];
    vendorList = [];
    public productData: any;
    constructor() {
    }
}
