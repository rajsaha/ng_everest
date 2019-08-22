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

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.checkIfSelf();
  }

  checkIfSelf() {
    this.router.params.subscribe((param) => {
      this.paramUsername = param.id;
      if (this.paramUsername === this.username) {
        this.isSelf = true;
      }
    });
  }
}
