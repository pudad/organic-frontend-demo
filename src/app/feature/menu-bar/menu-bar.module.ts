import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Shared Moduel
import { SharedModule } from '../../shared/shared.module';

import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    SharedModule,

  ],
  exports: [
    MenuComponent
  ]
})
export class MenuBarModule { }
