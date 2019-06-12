import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    snackBar: number;
    constructor(private router: Router, private _snackBar: MatSnackBar) {
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/']);
    }

    openSnackBar(message: string, action: string, className: string) {
        this._snackBar.open(message, action, {
            duration: 6000,
            panelClass: [className]
        });
    }

    onlyDecimalNumber(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
