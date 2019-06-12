import {Component} from '@angular/core';
import {AdminAuthService} from './helper/admin-auth.service';
import {CommonService} from './service/admin/common.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent {
    title = 'admin';

    constructor(private authService: AdminAuthService) {
    }
}
