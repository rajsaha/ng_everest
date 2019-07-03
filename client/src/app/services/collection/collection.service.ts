import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getCollectionNames(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/collection/get-collection-names`, data)
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
}
