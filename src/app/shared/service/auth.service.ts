import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Router } from "@angular/router";
import { AuthModel } from "../model/auth.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  
  static BASE__USERS_URL: string = "http://localhost:3000/users/";
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);


  constructor(private _http: HttpClient, private router: Router) {
    this.checkExpirationToken();
  }


  // SIGN IN
  SingIn(): Observable<AuthModel> {

    try {
      
      return this._http
      .post<AuthModel>(
        `${AuthService.BASE__USERS_URL}login`,
        { email: "admin@mail.com", password: "222222" }
      )
      .pipe(
        map((res: AuthModel) => {
          res ? this.isLoggedIn$.next(true) : this.isLoggedIn$.next(false);
          return res;
        })
      );

    } catch (error) {

      console.error(error);
    }
  }

  // SIGN UP
  SignUp(dataSignUp: any): Observable<any> {

    try {

      const fd = new FormData;
      fd.append('imageFile', dataSignUp.imageFile);
      fd.append('email', dataSignUp.email);
      fd.append('password', dataSignUp.password);
      fd.append('username', dataSignUp.username);

      return this._http.post(
        AuthService.BASE__USERS_URL, fd
      );

    } catch (error) {

      console.error(error);

    }
  }

  // LOGOUT
  SignOut() {

    if (JSON.parse(localStorage.getItem("token"))) {
      localStorage.removeItem("token");
    }
      

  }

  // TOKEN EXPIR
  private checkExpirationToken() {

    try {

      // ต้องมี token และ exp
      if (
        !!JSON.parse(localStorage.getItem("token")) &&
        !!JSON.parse(localStorage.getItem("token")).exp
      ) {
        // ยังไม่หมดอายุ = flase, หมดอายุ = true
        let isExpir: boolean =
          Math.floor(new Date().getTime() / 1000) >=
          JSON.parse(localStorage.getItem("token")).exp;

        // หมดอายุ
        if (isExpir) {
          console.log("token หมดอายุแล้ว");
          this.SignOut();
          this.router.navigate(["/auth/sign-in"]);
          return true;
        }
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  getUsers(): Observable<any[]> {
    return this._http.get<any[]>(AuthService.BASE__USERS_URL);
  }

  getToken(): any {
    if (JSON.parse(localStorage.getItem("token"))) {
      return JSON.parse(localStorage.getItem("token")).token;
    }
    
  }
}
