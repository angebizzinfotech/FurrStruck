import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {AdminAuthGuardService} from './helper/admin-auth-guard.service';
import {HttpInterceptorService} from './helper/http-interceptor.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import { SidebarComponent } from './main-nav/sidebar/sidebar.component';
import { HomeComponent } from './components/front-end/home/home.component';
import { ProductDetailComponent } from './components/front-end/product-detail/product-detail.component';
import { ProductListComponent } from './components/front-end/product-list/product-list.component';

@NgModule({
    declarations: [
        AppComponent,
        MainNavComponent,
        SidebarComponent,
        HomeComponent,
        ProductDetailComponent,
        ProductListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        NgxSpinnerModule
    ],
    providers: [
        AdminAuthGuardService,
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
