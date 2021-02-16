import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ShopsComponent } from './shops.component';


const routes: Routes = [
  { path: '', component: ShopsComponent,
    children: [
      { path: '', component: ProductListComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
