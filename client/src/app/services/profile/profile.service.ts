import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      this.http.post(`${ENV.API_URL}/profile/update-user-data`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  removeInterest(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/profile/remove-user-interest`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  saveProfilePhoto(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/profile/save-profile-photo`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  deleteProfilePhoto(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.delete(`${ENV.API_URL}/profile/delete-profile-photo/${data.id}/${data.deleteHash}`)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  getProfilePhoto(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${ENV.API_URL}/profile/get-profile-photo/${data}`)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }
}
