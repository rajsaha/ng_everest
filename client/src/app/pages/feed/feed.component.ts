import { Component, OnInit } from '@angular/core';
import { GetFeedService } from '../../services/data/get-feed.service';
import { faPlus, faLink, faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts = [];
  isFabActive = false;

  // Icons
  faPlus = faPlus;
  faLink = faLink;
  faFile = faFile;

  constructor(private getFeedService: GetFeedService) { }

  ngOnInit() {
    this.getFeedService.getFeed().subscribe((res: any) => {
      this.posts = res.data;
    });
  }

}
