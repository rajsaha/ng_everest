import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/forms/validation.service';
import { SignupService } from '@services/signup/signup.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../general/snackbar/snackbar.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isDisabled = true;
  signingUp = false;

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private validationService: ValidationService,
    private signUpService: SignupService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.init_signup_form();
  }

  onSubmit() {
    this.signingUp = true;
    if (this.signUpForm.valid) {
      this.signUpService.signUp(this.signUpForm.value).then((res) => {
        this.signingUp = false;
        if (!res.error) {
          this.openSnackBar({
            message: {
              message: `Hello, ${res.username}!`,
              error: false
            },
            class: 'green-snackbar',
          });
          this.router.navigate(['feed']);
        } else {
          this.openSnackBar({
            message: {
              message: `Error: ${res.error}!`,
              error: true
            },
            class: 'red-snackbar',
          });
        }
      });
    }
  }

  init_signup_form() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['']
    }, { validator: [this.validationService.matchingConfirmPasswords, this.validationService.checkPasswordStrength] });
  }

  openSnackBar(data: any) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: data.message,
      duration: 2000,
      panelClass: [data.class]
    });
  }

}
