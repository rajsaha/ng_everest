import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) { }

  login(loginCred: object): Promise<any> {
    return new Promise(resolve => {
      this.http
        .post(`${ENV.API_URL}/login`, loginCred)
        .subscribe((response: any) => {
          if (!response.error) {
            this.setSession({
              token: response.token, 
              expiresIn: response.expiresIn, 
              username: response.username, 
              userId: response.userId, 
              image: response.image,
              firstName: response.firstName,
              lastName: response.lastName
            });
          }
          resolve(response);
        });
    });
  }

  private setSession(data: any) {
    const expiresAt = moment().add(data.expiresIn, 'milliseconds');

    localStorage.setItem('token', data.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('username', data.username);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    if (data.image) {
      localStorage.setItem('profileImage', data.image);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImage');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  redirectIfLoggedIn() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['']);
    }
  }
}
