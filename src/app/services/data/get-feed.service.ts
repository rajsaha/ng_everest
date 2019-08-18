import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetFeedService {
  apiUrl = '../../../assets/data.json';
  constructor(private http: HttpClient) { }

  getFeed() {
    return this.http.get(this.apiUrl);
  }
}
