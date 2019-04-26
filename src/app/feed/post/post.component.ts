import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp, faComment, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() data: any;

  // Data
  username: string;
  url: string;
  title: string;
  tags = [];
  description: string;
  image: string;
  timestamp: Date;
  allComments = [];

  // Icons
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faPlus = faPlus;

  constructor() { }

  ngOnInit() {
    this.username = this.data.username;
    this.url = this.data.url;
    this.title = this.data.title;
    this.tags = this.data.tags;
    this.description = this.data.description;
    this.image = this.data.image;
    this.timestamp = this.data.timestamp;
    this.allComments = this.data.all_comments;
  }

}
