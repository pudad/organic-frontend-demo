import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { DashboardComponent } from './dashboard.component';
import { FormProductsComponent } from './form-products/form-products.component';
import { HomeDashComponent } from './home-dash/home-dash.component';
import { ReviewProductComponent } from './review-product/review-product.component';


const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
      { path: '', component: HomeDashComponent },
      { path: 'products', component: AllProductsComponent },
      { path: 'add-product', component: FormProductsComponent, data: {formType: 'Add Product'} },
      { path: 'update-product/:productId', component: FormProductsComponent, data: {formType: 'Update Product'} },
      { path: 'review-product', component: ReviewProductComponent },
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
