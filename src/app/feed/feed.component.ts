import { Component, OnInit } from '@angular/core';
import { GetFeedService } from '../services/data/get-feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  data = [];
  constructor(private getFeedService: GetFeedService) { }

  ngOnInit() {
    this.getFeedService.getFeed().subscribe((res: any) => {
      console.table(res.data);
      this.data = res;
    });
  }

}
