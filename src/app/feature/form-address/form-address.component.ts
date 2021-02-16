import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss']
})
export class FormAddressComponent implements OnInit {

  private form: FormGroup;
  private userID: string;
  @Output() submitFormAddress = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loadUserId();
    this.createForm();
  }

  private onSubmitForm(e: Event) {
    e.preventDefault();

    this.submitFormAddress.emit(this.form);
  }

  private loadUserId() {
    if (localStorage.getItem("token")) {
      this.userID = JSON.parse(localStorage.getItem("token")).userId;
    }
  }

  private createForm() {
    this.form = this.fb.group({
      fullname: new FormControl(),
      userId: new FormControl(this.userID),
      address: new FormGroup({
        address: new FormControl(),
        subDistrict: new FormControl(),
        district: new FormControl(),
        province: new FormControl(),
        postcode: new FormControl(),
        tel: new FormControl(),
        etc: new FormControl(),
      })
    });
  }

}
