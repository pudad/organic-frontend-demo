import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  showImageProfile: string = "https://www.greenery.org/wp-content/uploads/2019/04/placeholder.png";
  imageFile: File;
  form: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl("", [ Validators.required, Validators.minLength(5)]),
      email: new FormControl("", [ Validators.required, Validators.email]),
      password: new FormControl("", [ Validators.required, Validators.minLength(6)]),
      imageFile: new FormControl("", Validators.required),
    });
  }

  // submit form. singe up.
  onSubmitForm(event: Event) {
    event.preventDefault();

    this.authService.SignUp(this.form.value).subscribe({
      next: (res) => console.log(res),
      error: (err) => {
        console.error(err.error.message);
        this.errorMessage = err.error.message;
      },
      complete: () => {
        console.log("Sign up Complete");
        this.route.navigate(["/auth/sign-in"]);
        this.form.reset();
      },
    });
    // this.route.navigate(["/auth/sign-up"]);
    
  }

  // choose images profile
  selectImage(e) {
    // file images form input:file
    const imageFile: File = e.target.files[0];
    // images type.
    const fileType: string[] = ["image/png", "image/jpeg", "image/jpg"];

    // check type file. must images file only.
    if (!!imageFile && fileType.includes(imageFile.type)) {
      // new object FIleReader.
      const fd = new FileReader();
      // transform file to 64bit file.
      fd.readAsDataURL(imageFile);

      fd.onload = (e: any) => {
        // transform 64bit file to string type and set to showImageProfile. for set images in template.
        this.showImageProfile = e.target.result as string;

        // set images to imageFile of form.
        this.form.patchValue({ imageFile });
      };
    }
  }
}
