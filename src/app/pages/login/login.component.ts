import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/auth/login.service';
import { CommunicationService } from '@services/general/communication.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggingIn = false;
  isLoading = false;

  // Icons
  faArrowRight = faArrowRight;

  constructor(private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,
              private communicationService: CommunicationService,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
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

  login() {
    this.loggingIn = true;
    this.isLoading = true;
    this.loginService.login(this.loginForm.value).then((res) => {
      this.isLoading = false;
      this.loggingIn = false;
      if (!res.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: `Welcome back, ${res.username}!`,
            error: false
          },
          class: 'green-snackbar',
        });
        this.communicationService.changeAuthState(true);
        this.router.navigate(['']);
      } else {
        this.snackbarService.openSnackBar({
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
