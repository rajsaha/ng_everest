import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as ENV } from '@environments/environment';
import * as moment from 'moment';
import { ResourceService } from '@services/resource/resource.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {
  id: string;
  resource: any;
  userImage: string;
  isLoading = false;

  // Data
  username: string;
  timestamp: string;
  image: string;
  title: string;
  description: string;

  // Empty states
  noPhoto = `${ENV.SITE_URL}/assets/images/portrait.jpg`;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  async ngOnInit() {
    await Promise.all([
      this.getResourceId(),
      this.getResource()
    ]);
  }

  getResourceId() {
    this.route.params.subscribe(params => {
      this.id = params.resourceId;
    });
  }

  async getResource() {
    this.isLoading = true;
    const response = await this.resourceService.getResource({ id: this.id });
    this.resource = response.resource;
    this.isLoading = false;

    this.username = this.resource.username;
    await this.getUserImage(this.resource.username);

    this.image = this.resource.image;
    this.title = this.resource.title;
    this.description = this.resource.description;
    this.timestamp = moment(this.resource.timestamp).fromNow();
    console.log(response);

  }

  async getUserImage(username) {
    const result = await this.resourceService.getUserImage(username);
    this.userImage = result.image ? result.image : this.noPhoto;
  }
}
