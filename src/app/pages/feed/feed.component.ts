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
  isLoading = false;

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
    this.getAllResources(0, 4);
  }

  async getAllResources(start, end) {
    try {
      this.isLoading = true;
      const response = await this.resourceService.getAllResources(start, end);
      this.isLoading = false;
      this.posts = response.resources;
    } catch (err) {
      console.error(err);
    }
  }

  onScrollDown(ev) {
    console.log('scrolled down!!', ev);

  }

  onUp(ev) {
    console.log('scrolled up!', ev);
  }

}
