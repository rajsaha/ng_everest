import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  // * Used in share resource / edit resource page
  // * to retrieve open graph data which contains
  // * site image, title, and other accompanying data
  getOpenGraphData(url: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/resource/get-opengraph-data`, url)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  shareResource(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/resource/share-resource`, data)
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

  getResource(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${ENV.API_URL}/resource/get/one/${data.id}`)
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

  removeTag(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${ENV.API_URL}/resource/edit/remove-tag`, data)
      .subscribe((response: any) => {
        resolve(response);
      });
    });
  }
}
