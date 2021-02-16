import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductModel } from "src/app/shared/model/product.model";
import { CartService } from "src/app/shared/service/cart.service";
import { ProductShopService } from "src/app/shared/service/productShop.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  private toggleFilter: boolean = false;
  private toggleSearch: boolean = false;
  private toggelIconSearch: string = "fas fa-search";
  private counterQty: number = 1;
  private modal: boolean = false;
  private Products: ProductModel[] = [];
  private Product: ProductModel;
  private imageModalMain: string;

  constructor(
    private productService: ProductShopService,
    private cartService: CartService,
    private routes: Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  createCart(productId: string) {
    if (localStorage.getItem("token") === null) {
      this.routes.navigate(["/auth/sign-in"]);
      return;
    }
    const { userId } = this.getToken();

    this.cartService.createCart(userId, productId, this.counterQty).subscribe({
      next: (cart) => console.log(cart),
      error: (err) => console.error(err),
      complete: () => {
        this.counterQty = 1;

        if (!!this.getToken()) {
          this.cartService.getAmountProductInCart(userId);
          console.log("pro list")
        }
        
      },
    });
  }

  private setImageModalMain(imageUrl: string) {
    this.imageModalMain = imageUrl;
  }

  private onClickView(productId) {
    if (this.Products.length <= 0) return;

    // set image modal
    this.Product = this.Products.find((pro) => pro._id === productId);
    this.imageModalMain = this.Product.imagesUrl[0];

    // call modal product detail
    this.modal = !this.modal;
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.Products = products.products;
      },
      error: (err) => console.error(err),
      complete: () => console.log("Load Products Complete"),
    });
  }

  onClickCloseModal() {
    this.modal = !this.modal;
  }

  // ปุ่มคัดกรอง
  private showFilter() {
    this.toggleFilter = !this.toggleFilter;
    this.toggleSearch = false;
  }

  // ปุ่มค้นหา
  private showSearch() {
    this.toggleSearch = !this.toggleSearch;
    this.toggleFilter = false;

    // เปลี่ยนไอคอน ปุ่มค้นหา
    if (this.toggleSearch == true) {
      this.toggelIconSearch = "fas fa-times";
    } else {
      this.toggelIconSearch = "fas fa-search";
    }
  }

  // ลดจำนวนที่จะซื้อ ครั้งละ1 แต่ต้องไม่ต่ำกว่า 0
  private decrease() {
    this.counterQty !== 1 ? this.counterQty-- : (this.counterQty = 1);
  }

  // เพิ่มจำนวนที่จะซื้อ ครั้งละ1 แต่ต้องไม่ต่ำกว่า 10
  private increase() {
    this.counterQty !== 10 ? this.counterQty++ : (this.counterQty = 10);
  }

  private getToken(): any {
    return JSON.parse(localStorage.getItem("token"));
  }
}
