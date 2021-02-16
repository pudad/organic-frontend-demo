import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Subscription } from 'rxjs';
import { AuthModel } from 'src/app/shared/model/auth.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  errorMessage: string = null;
  subscrition: Subscription[];
  @Output() submitForm = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    // creat form
    this.form = this.fb.group({
      email: new FormControl('admin@mail.com', [ Validators.required, Validators.email ]),
      password: new FormControl('222222', [ Validators.required, Validators.minLength(6) ]),
    });
  }

  onSubmitForm(event: Event) {

    event.preventDefault();

    this.authService.SingIn().subscribe({
      next: (res: AuthModel) => {
        res ?
          localStorage.setItem("token", JSON.stringify(res)) : 
          localStorage.removeItem("token");
      },
      error: (err) => {
        console.error(err);
        // this.errorMessage = err.error.message;
      },
      complete: () => {
        this.authService.getUsers().subscribe({
          next: (res) => console.log("load Product complete"),
          error: (err) => console.error(err),
        });
        this.form.reset();
        this.router.navigate(["/"]);
      },
    });
    
  }

}
