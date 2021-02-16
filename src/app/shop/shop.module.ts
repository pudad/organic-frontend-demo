import { NgModule } from '@angular/core';

// Shared Module
import { SharedModule } from '../shared/shared.module';

// Menubar Module
import { MenuBarModule } from '../feature/menu-bar/menu-bar.module';

// Proudct-item Moduel
import { ProductItemModule } from '../feature/product-item/product-item.module';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopsComponent } from './shops.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [ShopsComponent, ProductListComponent],
  imports: [
    SharedModule,
    ShopRoutingModule,
    MenuBarModule,
    ProductItemModule
  ]
})
export class ShopModule { }
