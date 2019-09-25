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

  // Pagination
  pageNo = 1;
  size = 3;

  constructor(private resourceService: ResourceService) { }

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    await this.getAllResources();
  }

  async getAllResources() {
    try {
      const response = await this.resourceService.getAllResources({
        pageNo: this.pageNo,
        size: this.size,
        username: this.username
      });
      for (const resource of response.resources) {
        this.posts.push(resource);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async onScrollDown(ev) {
    console.log('scrolled down!!', ev);
    await this.loadMorePosts();
  }

  onUp(ev) {
    console.log('scrolled up!', ev);
  }

  async loadMorePosts() {
    this.pageNo++;
    await this.getAllResources();
  }

}
