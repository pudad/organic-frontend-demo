import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { ProductModel } from "../model/product.model";
import { AmountProductRespone } from "../model/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {

  static BASE_CART_URL: string = "http://localhost:3000/cart";
  private amountProduct$: Subject<number> = new Subject;

  constructor(private _http: HttpClient) {}

  getCart(userId?: string): Observable<any> {
    return this._http.get<any>(CartService.BASE_CART_URL, {
      params: { userId },
    });
  }

  createCart(userId: string, productId: string, product_qty: number) {
    const body = { productId, product_qty };
    return this._http.post(CartService.BASE_CART_URL, body, {
      params: { userId },
    });
  }

  getAmountProductInCart(userId: string) {
    this._http.get(`${CartService.BASE_CART_URL}/amount-product`, {params: { userId }}).subscribe({
      next: (res: AmountProductRespone) => this.amountProduct$.next(res.value),
      error: (err) => this.amountProduct$.next(err.error.value)
    });

  }

  loadAmountProduct(): Observable<number> {
    return this.amountProduct$;
  }

  deleteCart(cartId: string): Observable<any> {
    return this._http.delete(CartService.BASE_CART_URL, {params: {cartId}});
  }
}
