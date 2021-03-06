import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '@services/resource/resource.service';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() data: { resourceId: string, count: number };
  allComments = [];

  // Pagination
  pageNo = 1;
  size = 5;
  count = 0;
  isLoading = false;

  constructor(private resourceService: ResourceService) {}

  async ngOnInit() {
    this.count = this.data.count;
    if (this.data.count > 0) {
      await this.getComments();
    }
  }

  async getComments() {
    const response: any = await this.resourceService.getResourceComments({
      pageNo: this.pageNo,
      size: this.size,
      resourceId: this.data.resourceId
    });

    if (response.error) {
      return;
    }

    this.count = response.count;

    for (const comment of response.comments) {
      this.allComments.push(comment);
    }
  }

  async getMoreComments() {
    this.isLoading = true;
    this.pageNo++;
    await this.getComments();
    this.isLoading = false;
  }

  formatTime(date: Date) {
    return dayjs(date).fromNow();
  }

  addCommentToArray(comment: any) {
    this.allComments.push(comment);
  }
}
