import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ResourceService } from '@services/resource/resource.service';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  posts = [];
  isLoading = false;
  username: string;
  userId: string;
  interests = [];

  // Infinite Scroll
  sum = 2;
  throttle = 300;
  scrollDistance = 2;
  scrollUpDistance = 2;

  // Pagination
  pageNo = 1;
  size = 3;

  constructor(private resourceService: ResourceService, private readonly meta: MetaService, private userService: UserService) { }

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem("userId");
    await this.getUserInterests();
    await this.getExploreFeed();

    // * Set meta tags
    this.meta.setTitle("Explore");
    this.meta.setTag('og:description', "Discover something new");
  }

  async getExploreFeed() {
    try {
      this.isLoading = true;
      const response: any = await this.resourceService.getExploreFeed({
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
    await this.getExploreFeed();
  }

  async refresh($event) {
    if ($event) {
      await this.getExploreFeed();
      await this.getUserInterests();
    }
  }

  async getUserInterests() {
    const result: any = await this.userService.getUserInterests({ userId: this.userId });
    this.interests = result.user.interests;
  }

}
