import { Component, OnInit } from '@angular/core';
import { faPlus, faLink, faFile } from '@fortawesome/free-solid-svg-icons';
import { ResourceService } from '@services/resource/resource.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  posts = [];
  isFabActive = false;
  username: string;

  // Icons
  faPlus = faPlus;
  faLink = faLink;
  faFile = faFile;

  sum = 2;
  throttle = 300;
  scrollDistance = 2;
  scrollUpDistance = 2;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.getAllResources({
      start: 0,
      end: 4,
      username: this.username
    });
  }

  async getAllResources(data: any) {
    try {
      const response = await this.resourceService.getAllResources(data);
      this.posts = response.resources;
    } catch (err) {
      console.error(err);
    }
  }

  onScrollDown() {
    console.log('scrolled down!!');

  }

  onUp() {
    console.log('scrolled up!');
  }

}
