import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CartRespone } from "../shared/model/cart.model";
import { OrderModel } from "../shared/model/order.model";
import { ProductModel } from "../shared/model/product.model";
import { AddressService } from "../shared/service/address.service";
import { CartService } from "../shared/service/cart.service";
import { OrderService } from "../shared/service/order.service";

@Component({
  selector: "app-carts",
  templateUrl: "./carts.component.html",
  styleUrls: ["./carts.component.scss"],
})
export class CartsComponent implements OnInit {
  private counterQty: number = 0;
  private userId: string;
  private isEmtryCart: boolean;
  private cartList: CartRespone;
  private productInCarts: any[];
  private price: number;
  private totolPrice: number = 0;
  private defaultVat: number = 3;
  private vat3: number = 0;
  private allPrice: number = 0;
  private cartId: string;

  constructor(
    private cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem("token")).userId;
    this.getCart(this.userId);
  }

  getCart(userId: string) {
    this.cartService.getCart(userId).subscribe({
      next: (cart) => {
        this.isEmtryCart = cart.isEmtry;
        this.cartList = cart.msg;
        this.productInCarts = cart.msg.products;
        this.totolPrice = cart.msg.cart_totalPrice;
        this.vat3 = this.findVat3(this.defaultVat, this.totolPrice);
        this.allPrice = this.totolPrice + this.vat3;
        this.cartId = cart.msg._id;
      },
      error: (err) => console.error(err),
      complete: () => console.log("complete"),
    });
  }

  private onSubmitForm(formValue: FormGroup) {
    
    let addressId: string;
    let totalQty: number = 0;
    let totalCost: number = 0;
    let item: any[] = [];

    this.addressService.createAddress(this.userId, formValue.value).subscribe({
      next: (res) => {
        console.log(res.msg);
        addressId = res.addressId;
      },
      error: (err) => console.error(err)
    });

    this.productInCarts.forEach((pro) => {
      totalQty += pro.product_qty;
      totalCost += pro.product_totalPrice;
      item.push({
        productId: pro.productId._id,
        qty: pro.product_qty,
        price: pro.product_totalPrice,
      });
    });

    let myOrder = {
      address: addressId,
      delivered: false,
      cart: {
        totalQty: totalQty,
        totalCost: totalCost,
        itmes: [
          ...item
        ]
      }
    };

    this.orderService.createOrder(this.userId, myOrder).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
      complete: () => {
        console.log(this.userId)
        this.cartService.deleteCart(this.cartId).subscribe();
        this.getCart(this.userId);
      }
    });
  }

  // ลดจำนวนที่จะซื้อ ครั้งละ1 แต่ต้องไม่ต่ำกว่า 0
  private decrease(proudctIndex: number, productPrice: number) {
    if (this.productInCarts[proudctIndex].product_qty === 1) return;

    this.productInCarts[proudctIndex].product_qty -= 1;
    this.productInCarts[proudctIndex].product_totalPrice =
      this.productInCarts[proudctIndex].product_qty * productPrice;

    this.totolPrice = 0;
    this.totolPrice = this.findTotolPrice(this.productInCarts);

    this.vat3 = this.findVat3(this.defaultVat, this.totolPrice);

    this.allPrice = this.findAllPrice(this.totolPrice, this.vat3);
  }

  // เพิ่มจำนวนที่จะซื้อ ครั้งละ1 แต่ต้องไม่ต่ำกว่า 10
  private increase(proudctIndex: number, productPrice: number) {
    if (this.productInCarts[proudctIndex].product_qty === 10) return;

    this.productInCarts[proudctIndex].product_qty += 1;
    this.productInCarts[proudctIndex].product_totalPrice =
      this.productInCarts[proudctIndex].product_qty * productPrice;

    this.totolPrice = 0;
    this.totolPrice = this.findTotolPrice(this.productInCarts);

    this.vat3 = this.findVat3(this.defaultVat, this.totolPrice);

    this.allPrice = this.findAllPrice(this.totolPrice, this.vat3);
  }

  private findVat3(vat: number, price: number): number {
    return (price * 3) / 100;
  }

  private findTotolPrice(product: any[]): number {
    let result: number = 0;
    product.forEach((pro) => {
      result += pro.product_totalPrice;
    });
    return result;
  }

  private findAllPrice(totalPrice: number, vat: number) {
    return totalPrice + vat;
  }
}
