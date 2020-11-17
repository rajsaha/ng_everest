import { Component, OnInit } from '@angular/core';
import { faPlus, faLink, faFile } from '@fortawesome/free-solid-svg-icons';
import { ResourceService } from '@services/resource/resource.service';
import { SeoServiceService } from '@services/seo-service/seo-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  posts = [];
  isFabActive = false;
  isLoading = false;
  username: string;
  userId: string;

  // Icons
  faPlus = faPlus;
  faLink = faLink;
  faFile = faFile;

  // Infinite Scroll
  sum = 2;
  throttle = 300;
  scrollDistance = 2;
  scrollUpDistance = 2;

  // Pagination
  pageNo = 1;
  size = 3;

  constructor(private resourceService: ResourceService, private seoService: SeoServiceService) { }

  async ngOnInit() {
    this.seoService.setFacebookTags(
      "/feed",
      "Feed",
      "Discover new resources");
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem("userId");
    await this.getAllResources();
  }

  async getAllResources() {
    try {
      this.isLoading = true;
      const response: any = await this.resourceService.getAllResources({
        pageNo: this.pageNo,
        size: this.size,
        userId: this.userId
      });
      for (const resource of response.resources) {
        this.posts.push(resource);
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
