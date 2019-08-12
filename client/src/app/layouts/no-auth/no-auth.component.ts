import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-auth',
  templateUrl: './no-auth.component.html',
  styleUrls: ['./no-auth.component.scss']
})
export class NoAuthComponent implements OnInit {

  isLoading = false;
  currentUrl: string;

  // Bg image
  image: string;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.setBgImage();
    });
  }

  ngOnInit() {}

  setBgImage() {
    this.currentUrl = this.router.url;

    switch (this.currentUrl) {
      case '/signup':
        this.image = '../../../../assets/mountains-circle-transparent.webp';
        break;
      case '/login':
        this.image = '../../../assets/mountains-circle-bottom.webp';
        break;
      default:
        this.image = '';
        break;
    }
  }

}
