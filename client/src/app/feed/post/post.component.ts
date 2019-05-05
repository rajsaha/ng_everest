import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp, faComment, faPlus, faReply } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

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
  timestamp: any;
  allComments = [];

  // Icons
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faPlus = faPlus;
  faReply = faReply;

  // Form
  commentForm: FormGroup;

  //Toggles
  isLiked = false;
  showComments = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.populatePost();
    this.init_comment_form();
  }

  populatePost() {
    this.username = this.data.username;
    this.url = this.data.url;
    this.title = this.data.title;
    this.tags = this.data.tags;
    this.description = this.data.description;
    this.image = this.data.image;
    this.timestamp = moment(this.data.timestamp.$date).fromNow();
    this.allComments = this.data.all_comments;
  }

  init_comment_form() {
    this.commentForm = this.fb.group({
      comment: ['']
    });
  }

}
