import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as ENV } from "@environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserId(username: string) {
    const response = this.http
      .post(`${ENV.API_URL}/user/get-user-id`, { username })
      .toPromise();
    return response;
  }

  getProfileData(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/get-user-data`, data)
      .toPromise();
    return response;
  }

  getPublicProfile(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/get-public-profile`, data)
      .toPromise();
    return response;
  }

  updateProfileData(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/update-user-data`, data)
      .toPromise();
    return response;
  }

  removeInterest(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/remove-user-interest`, data)
      .toPromise();
    return response;
  }

  saveProfilePhoto(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/save-profile-photo`, data)
      .toPromise();
    return response;
  }

  deleteProfilePhoto(data: any) {
    const response = this.http
      .delete(`${ENV.API_URL}/user/delete-profile-photo/${data.id}`)
      .toPromise();
    return response;
  }

  getProfilePhoto(data: any) {
    const response = this.http
      .get(`${ENV.API_URL}/user/get-profile-photo/${data}`)
      .toPromise();
    return response;
  }

  updatePassword(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/update-password`, data)
      .toPromise();
    return response;
  }

  // * Like and unlike post
  likePost(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/like`, data)
      .toPromise();
    return response;
  }

  unLikePost(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/unlike`, data)
      .toPromise();
    return response;
  }

  checkIfPostIsLiked(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/check-if-post-liked`, data)
      .toPromise();
    return response;
  }

  // * Follow / unfollow calls
  followUser(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/follow`, data)
      .toPromise();
    return response;
  }

  unfollowUser(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/unfollow`, data)
      .toPromise();
    return response;
  }

  checkIfUserFollowed(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/check-if-user-followed`, data)
      .toPromise();
    return response;
  }

  globalSearch(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/global-search/${data.query}`, data)
      .toPromise();
    return response;
  }

  getFollowersFollowing(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/user/get-followers-following`, data)
      .toPromise();
    return response;
  }
}
