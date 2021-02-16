import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  @ViewChild('radio1', {static: false}) radio1: ElementRef;
  private bgHero: string;
  private carousel: any[] = [
    { imageUrl: 'https://preview.colorlib.com/theme/cozastore/images/product-01.jpg', col: 'Wemen Collection', new:'NEW ARRIVALS'},
    { imageUrl: 'https://preview.colorlib.com/theme/cozastore/images/product-02.jpg', col: 'Men Collection', new:'NEW ARRIVALS'},
    { imageUrl: 'https://preview.colorlib.com/theme/cozastore/images/product-03.jpg', col: 'Men Collection', new:'NEW ARRIVALS'},
  ]
  @ViewChild('images', {static: false}) images: ElementRef; 

  constructor(private router: Router) { }

  ngOnInit() {


  }

  goToShop() {
    this.router.navigate(['/shop']);
  }



  

}
