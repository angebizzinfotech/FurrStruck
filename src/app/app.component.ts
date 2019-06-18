import {Component} from '@angular/core';
import {AdminAuthService} from './helper/admin-auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent {
    title = 'admin';
    url = true;

    constructor(private authService: AdminAuthService,
                private activateRoute: Router, private spinner: NgxSpinnerService) {
    }
}
