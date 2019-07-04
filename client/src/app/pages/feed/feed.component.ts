import { Component, OnInit } from '@angular/core';
import { GetFeedService } from '../../services/data/get-feed.service';
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
      const response = await this.resourceService.getAllResources({username: this.username});
      this.posts = response.resources;
    } catch (err) {
      console.error(err);
    }
  }

}
