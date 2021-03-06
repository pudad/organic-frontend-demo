import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddminGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!!JSON.parse(localStorage.getItem('token')) && !!JSON.parse(localStorage.getItem('token')).isAdmin) {
        return true;
      }

      this.router.navigate(['/auth/sign-in']);
      return false;
  }
  
}
