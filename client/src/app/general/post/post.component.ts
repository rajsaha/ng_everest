import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp, faComment, faPlus, faReply, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { AtcComponent } from '../dialogs/atc/atc.component';
import { PoComponent } from '../dialogs/po/po.component';
import { ResourceService } from '@services/resource/resource.service';
import { CollectionService } from '@services/collection/collection.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  @Input() data: any;

  currentUser: string;

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
  faEllipsisV = faEllipsisV;

  // Form
  commentForm: FormGroup;

  // Toggles
  isInCollection = false;
  isLiked = false;
  showComments = false;
  isSeeMore = false;
  truncateValue = 150;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private resourceService: ResourceService,
    private collectionService: CollectionService) { }

  async ngOnInit() {
    this.currentUser = localStorage.getItem('username');
    try {
      await Promise.all([
        this.populatePost(),
        this.getUserImage(this.data.username),
        this.checkIfPostInCollection(this.data._id, this.data.username),
        this.init_comment_form(),
        this.checkIfDescriptionTooLong(this.description)
      ]);
    } catch (err) {
      throw new Error(err);
    }
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
  }

  async getUserImage(username) {
    const result = await this.resourceService.getUserImage(username);
    this.userImage = result.image;
  }

  async checkIfPostInCollection(id: string, username: string) {
    const result = await this.collectionService.checkForResourceInCollection({ id, username: this.currentUser });
    if (result.isInCollection) {
      this.isInCollection = true;
    }
  }

  async init_comment_form() {
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

  async toggleLike() {
    // *
  }

  openCollectionsDialog() {
    const dialogRef = this.dialog.open(AtcComponent, {
      data: {
        id: this.id,
        url: this.url,
        title: this.title
      }
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result && result.added) {
        const res = await this.collectionService.checkForResourceInCollection({ id: this.id });
        if (res) {
          this.isInCollection = true;
        }
      }
    });
  }

  async checkIfDescriptionTooLong(text: string) {
    if (text.length > this.truncateValue) {
      this.isSeeMore = true;
    }
  }

  seeMore() {
    this.truncateValue = 1000;
    this.isSeeMore = false;
  }
}
