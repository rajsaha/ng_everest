import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  toItemIndexes<T>(a: T[]): any {
    return a.map((item, index) => ({item, index}));
  }
}
