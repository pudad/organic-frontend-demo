import { NgModule } from '@angular/core';

// Shared Module
import { SharedModule } from '../shared/shared.module';

// Menu Moduel
import { MenuBarModule } from '../feature/menu-bar/menu-bar.module';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';


@NgModule({
  declarations: [FavoriteComponent, FavoriteComponent],
  imports: [
    SharedModule,
    FavoriteRoutingModule,
    MenuBarModule
  ]
})
export class FavoriteModule {
  constructor() {console.log("OK")}
 }
