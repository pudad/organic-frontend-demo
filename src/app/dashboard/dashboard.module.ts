import { NgModule } from '@angular/core';

// Shared Moduel
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { FormProductsComponent } from './form-products/form-products.component';
import { ReviewProductComponent } from './review-product/review-product.component';
import { HomeDashComponent } from './home-dash/home-dash.component';


@NgModule({
  declarations: [DashboardComponent, AllProductsComponent, FormProductsComponent, ReviewProductComponent, HomeDashComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
