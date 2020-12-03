import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/auth/login.service';
import { CommunicationService } from '@services/general/communication.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MetaService } from '@ngx-meta/core';
import { OnExecuteData, OnExecuteErrorData, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggingIn: boolean;
  loginButtonText = 'Login';

  // Icons
  faArrowRight = faArrowRight;

  // Recaptcha
  public recentToken: string = '';
  public recentError?: { error: any };
  public readonly executionLog: Array<OnExecuteData | OnExecuteErrorData> = [];

  private allExecutionsSubscription: Subscription;
  private allExecutionErrorsSubscription: Subscription;
  private singleExecutionSubscription: Subscription;

  constructor(private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private communicationService: CommunicationService,
    private snackbarService: SnackbarService,
    private readonly meta: MetaService,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit() {
    // * Set meta tags
    this.meta.setTitle("Login");
    this.meta.setTag('og:description', "Login to Everest");
    this.loginService.redirectIfLoggedIn();
    this.init_login_form();
  }

  init_login_form() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: [false, [Validators.requiredTrue]]
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  async login() {
    // Handle empty fields
    if (!this.loginForm.get('username').value && !this.loginForm.get('password').value) {
      return;
    }

    const response = await this.loginService.login(this.loginForm.value);

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: `Welcome back, ${response.username}!`,
          error: false
        },
        class: 'green-snackbar',
      });
      this.communicationService.changeAuthState(true);
      this.router.navigate(['']);
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Error: ${response.error}!`,
          error: true
        },
        class: 'red-snackbar',
      });
    }
  }

  public executeAction(action: string): void {
    this.loggingIn = true;
    this.loginButtonText = 'Logging in...';
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
    this.singleExecutionSubscription = this.recaptchaV3Service.execute(action)
      .subscribe(
        async (token) => {
          this.recentToken = token;
          this.recentError = undefined;
          this.loginForm.get("recaptcha").patchValue(true);
          await this.login();
          this.loggingIn = false;
          this.loginButtonText = 'Login';
        },
        (error) => {
          this.recentToken = '';
          this.recentError = { error };
          this.loginForm.get("recaptcha").patchValue(false);
          this.loggingIn = false;
          this.loginButtonText = 'Login';
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

}
