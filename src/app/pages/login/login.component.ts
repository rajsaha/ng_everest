import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/auth/login.service';
import { CommunicationService } from '@services/general/communication.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SeoServiceService } from '@services/seo-service/seo-service.service';

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

  constructor(private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,
              private communicationService: CommunicationService,
              private snackbarService: SnackbarService,
              private seoService: SeoServiceService) { }

  ngOnInit() {
    this.seoService.setFacebookTags(
      "/login",
      "Login",
      "Login to Everest");
    this.loginService.redirectIfLoggedIn();
    this.init_login_form();
  }

  init_login_form() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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

    this.loggingIn = true;
    this.loginButtonText = 'Logging in...';
    const response = await this.loginService.login(this.loginForm.value);
    this.loggingIn = false;
    this.loginButtonText = 'Login';

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

}
