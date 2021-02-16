import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { ProductRespone } from 'src/app/shared/model/product.model';

@Injectable({
    providedIn: 'root'
})

export class ProductShopService {

    static BASE_PRODUCT_URL: string = "http://localhost:3000/products";

    constructor(private _http: HttpClient) {}


    getProducts(): Observable<ProductRespone> {

        return this._http.get<ProductRespone>(ProductShopService.BASE_PRODUCT_URL);
        
    }
    
}