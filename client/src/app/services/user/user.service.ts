import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfileData(username: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${ENV.API_URL}/user/get-user-data/${username}`)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  updateProfileData(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/user/update-user-data`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  removeInterest(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/user/remove-user-interest`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  saveProfilePhoto(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/user/save-profile-photo`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  deleteProfilePhoto(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.delete(`${ENV.API_URL}/user/delete-profile-photo/${data.id}/${data.deleteHash}`)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  getProfilePhoto(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${ENV.API_URL}/user/get-profile-photo/${data}`)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  updatePassword(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/user/update-password`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  // * Like and unlike post
  likePost(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/user/like`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  unLikePost(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/user/unlike`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  checkIfPostIsLiked(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/user/check-if-post-liked`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }
}
