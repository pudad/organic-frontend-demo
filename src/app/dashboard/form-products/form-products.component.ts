import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.scss']
})
export class FormProductsComponent implements OnInit {

  textButton: string;
  form: FormGroup;
  imageSelect: string[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.createForm();
    this.setTextButton();
    // this.activateRoute.data.subscribe(({formType}) => console.log(formType));
    
  }

  currentForm() {

  }


  getProduct(productId: string) {
    this.productService.getProduct(productId).subscribe({
      next: ({pCategory, pName, pCost, pPrice, pPriceSale, pDetail, qty, imagesUrl}) => {

        this.form.setValue({pCategory, pName, pCost, pPrice, pPriceSale, pDetail, qty, pImagesUrl: imagesUrl});

        for (let i = 0; i < imagesUrl.length; i++) {
          this.imageSelect.push(imagesUrl[i]);
        }
        

      },
      error: (err) => console.error(err),
      complete: () => console.log("Get Product Complete")
    });
  }


  onSubmitForm(e) {
    e.preventDefault();

    const userId: string = JSON.parse(localStorage.getItem('token')).userId;

    this.productService.createProduct(this.form.value, userId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
      complete: () => console.log('Create Complete')
    });
  }


  selectImages(image) {
    const imageFiles = image.target.files;
    
    for (let i = 0; i < imageFiles.length; i++) {

      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFiles[i]);
      fileReader.onload = (e: any) => {

        this.imageSelect.push(e.target.result as string);

        this.form.patchValue({"imagesUrl": imageFiles});
      }

    }
    
  }




  createForm() {
    this.form = this.fb.group({
      
      pCategory: new FormControl('', [Validators.required]),
      pName: new FormControl('', [Validators.required]),
      pCost: new FormControl('', [Validators.required]),
      pPrice: new FormControl('', [Validators.required]),
      pPriceSale: new FormControl('', [Validators.required]),
      pDetail: new FormControl('', [Validators.required]),
      qty: new FormControl('', [Validators.required]),
      imagesUrl: new FormControl('', [Validators.required])


    });
  }

  private setTextButton() {
    this.activateRoute.data.subscribe((res) => {
      // res.formType === "Add Product"
      //   ? (this.textButton = res.formType)
      //   : (this.textButton = res.formType);
      if (res.formType === "Add Product") {

        this.textButton = res.formType;
        this.createForm();

      }
      else {
        this.textButton = res.formType;
        let productId =  this.activateRoute.snapshot.params.productId;
        this.getProduct(productId);
      }
    });
  }

  test() {
    console.log(this.imageSelect)
  }

}
