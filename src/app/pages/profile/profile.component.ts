import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  paramUsername: string;
  isSelf = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.checkIfSelf();
  }

  checkIfSelf() {
    this.route.params.subscribe(param => {
      this.paramUsername = param.username;
      if (this.paramUsername === this.username) {
        this.isSelf = true;
      } else {
        this.isSelf = false;
      }
    });
  }
}
