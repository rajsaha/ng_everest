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
      this.http.post(`${ENV.API_URL}/resource/share-resource`, url)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }
}
