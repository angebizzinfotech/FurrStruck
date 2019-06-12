import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    mode = 0;
    obj: any;

    constructor() {
    }
}
