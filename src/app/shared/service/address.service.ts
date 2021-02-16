import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  static BASE_ADDRESS_URL: string = 'http://localhost:3000/address/';

  constructor(private _http: HttpClient) { }

  createAddress(userId: string, addressData: any): Observable<any> {
    return this._http.post(`${AddressService.BASE_ADDRESS_URL}${userId}`, addressData);
  }

  
}
