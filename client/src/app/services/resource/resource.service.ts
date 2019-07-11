import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getOpenGraphData(url: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/resource/share/get-opengraph-data`, url)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  shareResource(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/resource/share/share-resource`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  getAllResources(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/resource/get/all`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  deleteResource(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/resource/delete`, data)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }
}
