import { Component, OnInit } from '@angular/core';
import { environment as ENV } from '@environments/environment';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  apiKey = `${ENV.TINYMCE_API_KEY}`;

  constructor() {
  }

  ngOnInit() {
  }

}
