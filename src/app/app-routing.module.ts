import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from './material/material.module';
import {AdminLoginComponent} from './common/admin-login/admin-login.component';
import {AdminAuthGuardService} from './helper/admin-auth-guard.service';
import {FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import { WebComponent } from './common/web/web/web.component';

const routes: Routes = [
    {path: '', component: AdminLoginComponent},
    {path: 'admin', canActivate: [AdminAuthGuardService], loadChildren: './components/admin/admin.module#AdminModule'},
];

@NgModule({
    declarations: [AdminLoginComponent,WebComponent],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        MaterialModule
    ],
    exports: [RouterModule],
    providers: [

    ]
})
export class AppRoutingModule {
}
