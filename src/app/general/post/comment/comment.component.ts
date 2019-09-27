import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '@services/resource/resource.service';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() resourceId = '';

  allComments = [];

  // Pagination
  pageNo = 1;
  size = 3;

  constructor(private resourceService: ResourceService) { }

  async ngOnInit() {
    await this.getComments();
  }

  async getComments() {
    const response = await this.resourceService.getResourceComments({
      pageNo: this.pageNo,
      size: this.size,
      resourceId: this.resourceId
    });

    for (const comment of response.comments[0].comments) {
      this.allComments.push(comment);
    }
  }

  formatTime(date: Date) {
    return moment(date).fromNow();
  }

}
