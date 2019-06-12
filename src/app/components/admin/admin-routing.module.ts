import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {MaterialModule} from '../../material/material.module';
import {UserModalComponent} from './user/user-modal/user-modal.component';
import {VendorComponent} from './vendor/vendor.component';
import {VendorModalComponent} from './vendor/vendor-modal/vendor-modal.component';
import {CategoryComponent} from './category/category.component';
import {ManufacturerComponent} from './manufacturer/manufacturer.component';
import {ManufacturerModalComponent} from './manufacturer/manufacturer-modal/manufacturer-modal.component';
import {CategoryModalComponent} from './category/category-modal/category-modal.component';
import {SubCategoryComponent} from './sub-category/sub-category.component';
import {SubCategoryModalComponent} from './sub-category/sub-category-modal/sub-category-modal.component';
import {ProductComponent} from './product/product.component';
import {ProductModalComponent} from './product/product-modal/product-modal.component';
import {ProductImageModalComponent} from './product/product-image-modal/product-image-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductViewModalComponent } from './product/product-view-modal/product-view-modal.component';
 
const routes: Routes = [
    { path: '', component: UserComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/detail/:id', component: UserModalComponent },
    { path: 'vendor', component: VendorComponent },
    { path: 'vendor/detail/:id', component: VendorModalComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'category/detail/:id', component: CategoryModalComponent },
    { path: 'sub-category', component: SubCategoryComponent },
    { path: 'sub-category/detail/:id', component: SubCategoryModalComponent },
    { path: 'manufacturer', component: ManufacturerComponent },
    { path: 'manufacturer/detail/:id', component: ManufacturerModalComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product/detail/:id', component: ProductModalComponent },
];

@NgModule({
    declarations: [
        UserComponent,
        UserModalComponent,
        VendorComponent,
        VendorModalComponent,
        CategoryComponent,
        CategoryModalComponent,
        ManufacturerComponent,
        ManufacturerModalComponent,
        SubCategoryComponent,
        SubCategoryModalComponent,
        ProductComponent,
        ProductModalComponent,
        ProductImageModalComponent,
        DashboardComponent,
        ProductViewModalComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        ProductViewModalComponent
    ]
})
export class AdminRoutingModule {
}
