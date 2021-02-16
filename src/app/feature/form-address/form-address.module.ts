import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormAddressComponent } from './form-address.component';



@NgModule({
  declarations: [FormAddressComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  exports: [
    FormAddressComponent
  ]
})
export class FormAddressModule { }
