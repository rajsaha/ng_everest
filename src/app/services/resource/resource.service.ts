import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(private http: HttpClient) {}

  // * Used in share resource / edit resource page
  // * to retrieve open graph data which contains
  // * site image, title, and other accompanying data
  getOpenGraphData(url: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/get-opengraph-data`, url)
      .toPromise();
    return response;
  }

  shareResource(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/share-resource`, data)
      .toPromise();
    return response;
  }

  getUserResources(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/get/all/${data.username}`, data)
      .toPromise();
    return response;
  }

  getAllResources(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/get/all`, data)
      .toPromise();
    return response;
  }

  getResourceComments(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/get/resource-comments`, data)
      .toPromise();
    return response;
  }

  getResourceCommentsCount(data: any) {
    const response = this.http
      .get(
        `${ENV.API_URL}/resource/get/resource-comments-count/${data.resourceId}`
      )
      .toPromise();
    return response;
  }

  getResource(data: any) {
    const response = this.http
      .get(`${ENV.API_URL}/resource/get/one/${data.id}`)
      .toPromise();
    return response;
  }

  getMultipleResources(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/get/multiple-resources`, data)
      .toPromise();
    return response;
  }

  getFourImages(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/get/four-images-for-collection`, data)
      .toPromise();
    return response;
  }

  getResourceImage(resourceId: string) {
    const response = this.http
      .get(`${ENV.API_URL}/resource/get/resource-image/${resourceId}`)
      .toPromise();
    return response;
  }

  getUserImage(data: any) {
    const response = this.http
      .get(`${ENV.API_URL}/resource/get/user-image/${data}`)
      .toPromise();
    return response;
  }

  deleteResource(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/delete`, data)
      .toPromise();
    return response;
  }

  removeTag(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/edit/remove-tag`, data)
      .toPromise();
    return response;
  }

  editResource(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/edit`, data)
      .toPromise();
    return response;
  }

  addResourceToCollection(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/add-resource-to-collection`, data)
      .toPromise();
    return response;
  }

  addComment(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/add-comment`, data)
      .toPromise();
    return response;
  }

  searchForUserResources(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/resource/search-for-user-resources`, data)
      .toPromise();
    return response;
  }
}
