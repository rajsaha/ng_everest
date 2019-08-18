import { Component, OnInit } from '@angular/core';
import { faPlus, faLink, faFile } from '@fortawesome/free-solid-svg-icons';
import { ResourceService } from '@services/resource/resource.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
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

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.getAllResources();
  }

  async getAllResources() {
    try {
      this.isLoading = true;
      const response = await this.resourceService.getAllResources();
      this.isLoading = false;
      this.posts = response.resources;
    } catch (err) {
      console.error(err);
    }
  }

}
