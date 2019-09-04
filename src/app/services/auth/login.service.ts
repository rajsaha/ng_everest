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
            this.setSession(response.token, response.expiresIn, response.username, response.userId, response.image);
          }
          resolve(response);
        });
    });
  }

  private setSession(token, expiresIn, username, userId, image) {
    const expiresAt = moment().add(expiresIn, 'milliseconds');

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    if (image) {
      localStorage.setItem('profileImage', image);
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