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

  updateProfileData(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/profile/update-user-data`, data).subscribe((response: any) => {
        resolve(response);
      });
    });
  }

  removeInterest(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/profile/remove-user-interest`, data).subscribe((response: any) => {
        resolve(response);
      });
    });
  }

  saveProfilePhoto(image: File): Promise<any> {
    const formData = new FormData();
    formData.append('image', image);
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/profile/save-profile-photo`, formData).subscribe((response: any) => {
        resolve(response);
      });
    });
  }
}
