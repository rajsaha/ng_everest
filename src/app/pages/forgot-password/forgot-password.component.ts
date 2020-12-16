import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  step1form: FormGroup;
  step2form: FormGroup;
  step3form: FormGroup;

  formsReady = false;
  isLinear = true;
  step1Complete = true;
  step2Complete = true;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.step1form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });

    this.step2form = this.fb.group({
      code: ["", [Validators.required, Validators.pattern(/[0-9]{6}/)]]
    });

    this.step3form = this.fb.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
    this.formsReady = true;
  }

  submitStep1() {
    this.step1Complete = false;
    this.stepper.next();
    console.log('submitted step 1');
  }

  submitStep2() {
    this.step2Complete = false;
    this.stepper.next();
    console.log('submitted step 2');
  }

  submitStep3() {
    console.log('submitted step 3');
  }

}
