import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from './admin-auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuardService {

    constructor(private authService: AdminAuthService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/admin']);
            return false;
        }
    }
}
