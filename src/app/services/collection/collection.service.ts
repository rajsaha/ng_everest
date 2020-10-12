import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(private http: HttpClient) {}

  getCollections(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/collection/get-collections`, data)
      .toPromise();
    return response;
  }

  getCollectionById(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/collection/get-collection-by-id`, data)
      .toPromise();
    return response;
  }

  getCollectionTitles(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/collection/get-collection-titles`, data)
      .toPromise();
    return response;
  }

  getCollectionByTitle(data: any) {
    const response = this.http
      .post(
        `${ENV.API_URL}/collection/get-collection-by-title`,
        data
      )
      .toPromise();
    return response;
  }

  getCollectionTitleByResourceId(data: any) {
    const response = this.http
      .post(
        `${ENV.API_URL}/collection/get-collection-title-by-resource-id`,
        data
      )
      .toPromise();
    return response;
  }

  createCollectionAndPushResource(data: any) {
    const response = this.http
      .post(
        `${ENV.API_URL}/collection/create-collection-and-push-resource`,
        data
      )
      .toPromise();
    return response;
  }

  checkForResourceInCollection(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/collection/check-for-resource-in-collection`, data)
      .toPromise();
    return response;
  }

  deleteResourceFromCollection(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/collection/delete-resource-from-collection`, data)
      .toPromise();
    return response;
  }

  deleteCollection(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/collection/delete-collection`, data)
      .toPromise();
    return response;
  }

  editCollectionDetails(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/collection/edit-collection-details`, data)
      .toPromise();
    return response;
  }

  searchUserCollections(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/collection/search-user-collections`, data)
      .toPromise();
    return response;
  }

  checkIfMine(data: any) {
    const response = this.http
      .post(`${ENV.API_URL}/collection/check-if-mine`, data)
      .toPromise();
    return response;
  }
}
