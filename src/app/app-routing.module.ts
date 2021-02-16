import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AddminGuard } from './shared/guard/addmin.guard';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  { path: '',
    loadChildren: () => import('./home-page/home-page.module').then( module => module.HomePageModule) },
  { path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( module => module.ShopModule) },
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule) },
  { path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( module => module.CartModule), canActivate: [AuthGuard] },
  { path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then( module => module.FavoriteModule), canActivate: [AuthGuard] },
  { path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( module => module.DashboardModule), canActivate: [AuthGuard, AddminGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
