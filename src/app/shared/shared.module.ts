import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { TokenInterceptorService } from './service/tokenInterceptor.service';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { ProductShopService } from './service/productShop.service';
import { CartService } from './service/cart.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ProductShopService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    CartService
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
