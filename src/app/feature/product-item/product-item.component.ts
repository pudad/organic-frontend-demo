import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ProductModel } from 'src/app/shared/model/product.model';

@Component({
  selector: 'product-items',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnChanges {

  private productImageBg: string = 'https://preview.colorlib.com/theme/cozastore/images/product-03.jpg';
  @Output() onClickView = new EventEmitter();
  @Input("product") product: ProductModel;

  constructor() { }
 

  ngOnInit() {
  }

  private viewProduct(e: Event, productId: string) {
    e.preventDefault();
    this.onClickView.emit(productId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.product._id)
  }

}
