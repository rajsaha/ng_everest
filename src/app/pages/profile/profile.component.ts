import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  paramUsername: string;
  isSelf = false;

  constructor() {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }
}
