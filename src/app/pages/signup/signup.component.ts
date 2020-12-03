import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/forms/validation.service';
import { SignupService } from '@services/signup/signup.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { OnExecuteData, OnExecuteErrorData, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  isDisabled = true;
  signingUp = false;
  signUpButtonText = "Sign Up";
  passwordStrength: any;

  // Icons
  faArrowRight = faArrowRight;
  faCheckCircle = faCheckCircle;
  faTimes = faTimes;

  // Recaptcha
  public recentToken: string = '';
  public recentError?: { error: any };
  public readonly executionLog: Array<OnExecuteData | OnExecuteErrorData> = [];

  private allExecutionsSubscription: Subscription;
  private allExecutionErrorsSubscription: Subscription;
  private singleExecutionSubscription: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private validationService: ValidationService,
    private snackbarService: SnackbarService,
    private signUpService: SignupService,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit() {
    this.signUpService.redirectIfLoggedIn();
    this.init_signup_form();

    this.allExecutionsSubscription = this.recaptchaV3Service.onExecute
      .subscribe((data) => this.executionLog.push(data));
    this.allExecutionErrorsSubscription = this.recaptchaV3Service.onExecuteError
      .subscribe((data) => this.executionLog.push(data));
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      const res: any = await this.signUpService.signUp(this.signUpForm.value);
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
      confirm_password: [''],
      recaptcha: [false, [Validators.requiredTrue]]
    }, { validator: [this.validationService.matchingConfirmPasswords] });
  }

  get signUpFormControls() {
    return this.signUpForm.controls;
  }

  public executeAction(action: string): void {
    this.signingUp = true;
    this.signUpButtonText = 'Signing up...';
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
    this.singleExecutionSubscription = this.recaptchaV3Service.execute(action)
      .subscribe(
        async (token) => {
          this.recentToken = token;
          this.recentError = undefined;
          this.signUpForm.get("recaptcha").patchValue(true);
          await this.onSubmit();
          this.signingUp = false;
          this.signUpButtonText = "Sign Up";
        },
        (error) => {
          this.recentToken = '';
          this.recentError = { error };
          this.signUpForm.get("recaptcha").patchValue(false);
          this.signingUp = false;
          this.signUpButtonText = "Sign Up";
          this.snackbarService.openSnackBar({
            message: {
              message: `Recaptcha failed!`,
              error: true
            },
            class: 'red-snackbar',
          });
        },
      );
  }

  public ngOnDestroy() {
    if (this.allExecutionsSubscription) {
      this.allExecutionsSubscription.unsubscribe();
    }
    if (this.allExecutionErrorsSubscription) {
      this.allExecutionErrorsSubscription.unsubscribe();
    }
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
  }

  public formatToken(token: string): string {
    if (!token) {
      return '(empty)';
    }

    return `${token.substr(0, 7)}...${token.substr(-7)}`;
  }

}
