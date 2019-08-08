import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp, faComment, faPlus, faReply, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { AtcComponent } from '../dialogs/atc/atc.component';
import { PoComponent } from '../dialogs/po/po.component';
import { ResourceService } from '@services/resource/resource.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  @Input() data: any;

  // Data
  id: string;
  username: string;
  url: string;
  title: string;
  tags = [];
  description: string;
  image: string;
  userImage: string;
  timestamp: any;
  allComments = [];

  // Icons
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faPlus = faPlus;
  faReply = faReply;
  faEllipsisH = faEllipsisH;

  // Form
  commentForm: FormGroup;

  // Toggles
  isLiked = false;
  showComments = false;
  isSeeMore = false;
  truncateValue = 150;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private resourceService: ResourceService) { }

  async ngOnInit() {
    await this.populatePost();
    this.checkIfDescriptionTooLong(this.description);
  }

  async populatePost() {
    this.id = this.data._id;
    this.username = this.data.username;
    this.url = this.data.url;
    this.title = this.data.title;
    this.tags = this.data.tags;
    this.description = this.data.description;
    this.image = this.data.image;
    this.timestamp = moment(this.data.timestamp).fromNow();
    this.allComments = this.data.comments;
    this.init_comment_form();

    await this.getUserImage(this.username);
  }

  async getUserImage(username) {
    const result = await this.resourceService.getUserImage(username);
    this.userImage = result.image;
  }

  init_comment_form() {
    this.commentForm = this.fb.group({
      comment: ['']
    });
  }

  addComment() {
    console.log(this.commentForm.value);
  }

  textareaEnterPressed($event: KeyboardEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    // handle form submission
    console.log(this.commentForm.value);
  }

  openPostDialog() {
    const dialogRef = this.dialog.open(PoComponent, {
      data: {
        id: this.id,
        username: this.username
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openCollectionsDialog() {
    const dialogRef = this.dialog.open(AtcComponent, {
      data: {
        id: this.id,
        url: this.url,
        title: this.title,
        image: this.image
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  checkIfDescriptionTooLong(text: string) {
    if (text.length > this.truncateValue) {
      this.isSeeMore = true;
    }
  }

  seeMore() {
    this.truncateValue = 1000;
    this.isSeeMore = false;
  }
}
