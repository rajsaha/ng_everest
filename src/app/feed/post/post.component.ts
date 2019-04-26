import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp, faComment, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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

  // Form
  commentForm: FormGroup;

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
    this.timestamp = this.data.timestamp;
    this.allComments = this.data.all_comments;
  }

  init_comment_form() {
    this.commentForm = this.fb.group({
      comment: ['']
    });
  }

}
