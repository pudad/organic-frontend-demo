import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Feature Module
import { MenuBarModule } from '../feature/menu-bar/menu-bar.module';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';


@NgModule({
  declarations: [HomeComponent, HeroComponent],
  imports: [
    CommonModule,
    MenuBarModule,
    HomePageRoutingModule,
    
  ]
})
export class HomePageModule { }
