import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { CustomColorSchemeService } from '@services/custom-color-scheme/custom-color-scheme.service';
import { ColorSchemeService } from '@services/color-scheme/color-scheme.service';
dayjs.extend(relativeTime);

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router, private colorSchemeService: ColorSchemeService,
    private customColorSchemeService: CustomColorSchemeService) { }

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
    const expiresAt = dayjs().add(data.expiresIn, 'millisecond');

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
    return dayjs().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return dayjs(expiresAt);
  }

  redirectIfLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['']);
    } else {
      this.colorSchemeService.update("light");
      this.customColorSchemeService.setLightTheme();
    }
  }
}
