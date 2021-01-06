import { Component, OnInit } from '@angular/core';
import { ResourceService } from '@services/resource/resource.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  posts = [];
  isLoading = false;
  username: string;
  userId: string;

  // Infinite Scroll
  sum = 2;
  throttle = 300;
  scrollDistance = 2;
  scrollUpDistance = 2;

  // Pagination
  pageNo = 1;
  size = 3;

  constructor(private resourceService: ResourceService, private readonly meta: MetaService) { }

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem("userId");
    await this.getAllResources();

    // * Set meta tags
    this.meta.setTitle("Feed");
    this.meta.setTag('og:description', "See what your friends are sharing");
  }

  async getAllResources() {
    try {
      this.isLoading = true;
      const response: any = await this.resourceService.getAllResources({
        pageNo: this.pageNo,
        size: this.size,
        userId: this.userId
      });
      if ('resources' in response) {
        for (const resource of response.resources) {
          this.posts.push(resource);
        }
      }
      this.isLoading = false;
    } catch (err) {
      console.error(err);
    }
  }

  async onScrollDown() {
    await this.loadMorePosts();
  }

  onUp() {
    console.log('scrolled up!');
  }

  async loadMorePosts() {
    this.pageNo++;
    await this.getAllResources();
  }
}
