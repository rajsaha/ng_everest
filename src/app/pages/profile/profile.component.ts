import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  paramUsername: string;
  isSelf = false;

  constructor(private readonly meta: MetaService) {}

  ngOnInit() {
    // * Set meta tags
    this.meta.setTitle("Settings");
    this.meta.setTag('og:description', "Settings");
    this.username = localStorage.getItem('username');
  }
}
