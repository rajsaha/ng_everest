import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/forms/validation.service';
import { SignupService } from '@services/signup/signup.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isDisabled = true;
  signingUp = false;
  signUpButtonText = "Sign Up";
  passwordStrength: any;

  // Icons
  faArrowRight = faArrowRight;
  faCheckCircle = faCheckCircle;
  faTimes = faTimes;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private validationService: ValidationService,
    private snackbarService: SnackbarService,
    private signUpService: SignupService) { }

  ngOnInit() {
    this.signUpService.redirectIfLoggedIn();
    this.init_signup_form();
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      this.signingUp = true;
      this.signUpButtonText = 'Signing up...';
      const res: any = await this.signUpService.signUp(this.signUpForm.value);
      this.signingUp = false;
      this.signUpButtonText = "Sign Up";
      if (!res.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: `Hello, ${res.username}. You can login now.`,
            error: false
          },
          class: 'green-snackbar',
        });
        this.router.navigate(['/login']);
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: `Error: ${res.error}!`,
            error: true
          },
          class: 'red-snackbar',
        });
      }
    }
  }

  init_signup_form() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['']
    }, { validator: [this.validationService.matchingConfirmPasswords] });
  }

  get signUpFormControls() {
    return this.signUpForm.controls;
  }

}
