import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getCollections(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/get-collections`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  getCollectionById(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/get-collection-by-id`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  getCollectionNames(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/get-collection-names`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  getCollectionTitleByResourceId(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/get-collection-title-by-resource-id`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  createCollection(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/create-collection`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  checkForResourceInCollection(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/check-for-resource-in-collection`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  deleteResourceFromCollection(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/delete-resource-from-collection`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  deleteCollection(id: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${ENV.API_URL}/collection/delete-collection/${id}`)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  changeCollectionTitle(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/change-collection-title`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  searchUserCollections(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/search-user-collections`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  checkIfMine(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/check-if-mine`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }
}
