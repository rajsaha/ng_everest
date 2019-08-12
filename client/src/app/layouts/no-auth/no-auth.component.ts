import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-auth',
  templateUrl: './no-auth.component.html',
  styleUrls: ['./no-auth.component.scss']
})
export class NoAuthComponent implements OnInit {

  isLoading = false;

  // Bg image
  image = '../../../../assets/mountains-circle-transparent.png';
  constructor() { }

  ngOnInit() {
  }

}
