import { NgModule } from '@angular/core';
// Shared Module
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [SignInComponent, AuthComponent, SignUpComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    HttpClientModule
  ]
})
export class AuthModule { }
