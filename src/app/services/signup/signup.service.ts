import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, private router: Router) { }

  signUp(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/signup`, data).subscribe((response: any) => {
        resolve(response);
      });
    });
  }

  redirectIfLoggedIn() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['feed']);
    }
  }
}
