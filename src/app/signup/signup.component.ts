import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.init_signup_form();
  }

  onSubmit() {
  }

  init_signup_form() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
      password_2: ['']
    }, { validator: [this.matchingConfirmPasswords] });
  }

  matchingConfirmPasswords(passwordKey: any) {
    const passwordInput = passwordKey.value;
    if (passwordInput.password === passwordInput.password_2) {
      return null;
    } else {
      return passwordKey.controls.password_2.setErrors({ passwordNotEquivalent: true });
    }
  }

}
