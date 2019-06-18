import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from './material/material.module';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './components/front-end/home/home.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'admin', loadChildren: './components/admin/admin.module#AdminModule'},
];

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        MaterialModule
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
