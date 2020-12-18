import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from '@services/forgot-password/forgot-password.service';
import { ValidationService } from '@services/forms/validation.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
  isLoading = false;
  step1Complete = true;
  step2Complete = true;

  // Icons
  faArrowRight = faArrowRight;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private fb: FormBuilder, private validationService: ValidationService, private forgotPasswordService: ForgotPasswordService, private snackbarService: SnackbarService, private router: Router, private route: ActivatedRoute) { }

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
      confirm_password: ["", Validators.required]
    }, { validator: [this.validationService.matchingConfirmPasswords] });
    this.formsReady = true;
  }

  async submitStep1() {
    if (this.step1form.invalid) {
      this.step1form.controls.email.markAsDirty();
      return;
    }

    this.isLoading = true;
    const result: any = await this.forgotPasswordService.forgotPasswordStep1({ email: this.step1form.controls.email.value });
    this.isLoading = false;

    if (!result.error) {
      this.step1Complete = false;
      this.stepper.next();
    } else {
      this.snackbarService.openSnackBar({ message: { error: true, message: "Account with that email not found" }, class: "red-snackbar" });
    }
  }

  async submitStep2() {
    if (this.step2form.invalid) {
      this.step2form.controls.code.markAsDirty();
      return;
    }

    this.isLoading = true;
    const result: any = await this.forgotPasswordService.forgotPasswordStep2({ email: this.step1form.controls.email.value, code: this.step2form.controls.code.value });
    this.isLoading = false;

    if (!result.error) {
      this.step2Complete = false;
      this.stepper.next();
    } else {
      switch (result.message) {
        case "Code has expired":
          this.step1Complete = true;
          this.step2Complete = false;
          this.stepper.reset();
          this.snackbarService.openSnackBar({ message: { error: true, message: result.message }, class: "red-snackbar" });
          break;
        case "Incorrect code":
          this.snackbarService.openSnackBar({ message: { error: true, message: result.message }, class: "red-snackbar" });
          break;
        default:
          this.snackbarService.openSnackBar({ message: { error: true, message: result.message }, class: "red-snackbar" });
          break;
      }
    }
  }

  async submitStep3() {
    if (this.step3form.invalid) {
      this.step3form.controls.password.markAsDirty();
      this.step3form.controls.confirm_password.markAsDirty();
      return;
    }

    this.isLoading = true;
    const result: any = await this.forgotPasswordService.forgotPasswordStep3({ email: this.step1form.controls.email.value, code: this.step2form.controls.code.value, password: this.step3form.controls.password.value });
    this.isLoading = false;

    if (!result.error) {
      this.snackbarService.openSnackBar({ message: { error: false, message: "Password changed successfully" }, class: "green-snackbar" });
      this.router.navigate(
        [``],
        { relativeTo: this.route.parent }
      );
    }
  }

}
