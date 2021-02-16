import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/service/auth.service";
import { CartService } from "src/app/shared/service/cart.service";

@Component({
  selector: "menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  toggleSubmenu: boolean = false;
  toggleMenubar: boolean = false;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  imagProfile: string = "";
  rotateXIconSub: string;
  amountProductInCart: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.checkLoggedIn();
    this.callAmountProduct();
    this.getValueAmount();
  }

  onClickSignOut(e) {
    e.preventDefault();
    this.authService.SignOut();
    this.router.navigate(["/shop"]);
    console.log("OK");
  }

  onClickManager(e: Event) {
    e.preventDefault();
    this.toggleSubmenu = !this.toggleSubmenu;
  }

  private checkLoggedIn() {
    if (this.getToken()) {
      this.isLoggedIn = true;
      this.isAdmin = this.getToken().isAdmin;
    }
  }

  private getValueAmount() {
    this.cartService.loadAmountProduct().subscribe({
      next: (value: number) => this.amountProductInCart = value,
      error: (err) => console.error(err)
    }) 
  }

  private callAmountProduct() {
    if (!!this.getToken()) {
      const { userId } = this.getToken();
      this.cartService.getAmountProductInCart(userId);
    }
  }

  private getToken() {
    return JSON.parse(localStorage.getItem("token"));
  }
}
