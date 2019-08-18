import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private authStateSource = new Subject<boolean>();

  authState = this.authStateSource.asObservable();

  changeAuthState(state) {
    this.authStateSource.next(state);
  }
}
