import { Component, OnInit } from '@angular/core';
import { Meta } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private metaTagService: Meta) {}

  ngOnInit() {
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Everest, Social Media, Share academic resources' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Raj Saha' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }
}
