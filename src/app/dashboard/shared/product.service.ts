import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductModel, ProductRespone } from "src/app/shared/model/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  static BASE_PRODUCT_URL: string = "http://localhost:3000/products/";

  constructor(private _http: HttpClient) {}

  createProduct(productData: ProductModel, userId: string) {
    const { pCategory, pCost, pDetail, imagesUrl, pName, pPrice, pPriceSale, qty, } = productData;

    const fd = new FormData();

    fd.append('pCategory', pCategory);
    fd.append('pCost', pCost.toString());
    fd.append('pName', pName);
    fd.append('pDetail', pDetail);
    fd.append('pPrice', pPrice.toString());
    fd.append('pPriceSale', pPriceSale.toString());
    fd.append('qty', qty.toString());
    // fd.append('imagesFile', pImagesUrl);


    for (let i = 0; i < imagesUrl.length; i++) {
      fd.append('imagesFile', imagesUrl[i])
    }



    return this._http.post(`${ProductService.BASE_PRODUCT_URL}`, fd, {
      params: { userId: userId },
      // headers: new HttpHeaders({ "Content-Type": "application/json" }),
    });
  }

  getProducts(): Observable<ProductRespone> {
    return this._http.get<ProductRespone>(ProductService.BASE_PRODUCT_URL);
  }

  getProduct(productId: string): Observable<ProductModel> {
    return this._http.get<ProductModel>(`${ProductService.BASE_PRODUCT_URL}${productId}`);
  }
}
