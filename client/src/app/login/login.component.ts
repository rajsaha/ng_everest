import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '@services/auth/login.service';
import { MatSnackBar } from '@angular/material';
import { LoginSnackbarComponent } from './login-snackbar/login-snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private loginService: LoginService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.init_login_form();
  }

  init_login_form() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.loginService.login(this.loginForm.value).then((res) => {
      if (!res.error) {
        this.openSnackBar({
          message: {
            message: `Welcome back, ${res.username}!`,
            error: false
          },
          class: 'green-snackbar',
        });
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

  openSnackBar(data: any) {
    this.snackBar.openFromComponent(LoginSnackbarComponent, {
      data: data.message,
      duration: 2000,
      panelClass: [data.class]
    });
  }

}
