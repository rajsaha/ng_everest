import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from '../services/forms/validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isDisabled = true;
  constructor(private fb: FormBuilder, private validationService: ValidationService) { }

  ngOnInit() {
    this.init_signup_form();
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
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

}
