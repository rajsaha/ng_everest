import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  constructor() { }

  tabClick(event) {
    if (event.index === 2) {
      // this.getUserData();
    }
  }
}
