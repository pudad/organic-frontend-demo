import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderModel } from "../model/order.model";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  static URL_ORDER: string = "http://localhost:3000/orders";

  constructor(private _http: HttpClient) {}

  createOrder(userId: string, orderData: any): Observable<any> {
    return this._http.post(OrderService.URL_ORDER, orderData, {
      params: { userId }
    });
  }
}