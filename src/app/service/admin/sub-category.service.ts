import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SubCategoryService {
    mode = 0;
    obj: any;

    constructor() {
    }
}
