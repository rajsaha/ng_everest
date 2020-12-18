import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  forgotPasswordStep1(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/forgot-password/forgot-password-step-1`, data)
      .toPromise();
    return response;
  }

  forgotPasswordStep2(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/forgot-password/forgot-password-step-2`, data)
      .toPromise();
    return response;
  }

  forgotPasswordStep3(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/forgot-password/forgot-password-step-3`, data)
      .toPromise();
    return response;
  }
}
