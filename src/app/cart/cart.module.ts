import { NgModule } from '@angular/core';

// Shared Module
import { SharedModule } from '../shared/shared.module';

// Menu Module
import { MenuBarModule } from '../feature/menu-bar/menu-bar.module';

// Form Address Module
import { FormAddressModule } from '../feature/form-address/form-address.module';

// Button Module
import { ButtonModule } from '../feature/button/button.module';

import { CartRoutingModule } from './cart-routing.module';
import { CartsComponent } from './carts.component';


@NgModule({
  declarations: [CartsComponent],
  imports: [
    SharedModule,
    CartRoutingModule,
    MenuBarModule,
    FormAddressModule,
    ButtonModule
  ]
})
export class CartModule { }
