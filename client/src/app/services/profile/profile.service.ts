import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfileData(username: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${ENV.API_URL}/profile/get-user-data/${username}`)
      .subscribe((response: any) => {
        resolve(response);
      });
    });
  }
}
