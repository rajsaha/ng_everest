import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp, faComment, faPlus, faReply, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { AtcComponent } from '../dialogs/atc/atc.component';
import { PoComponent } from '../dialogs/po/po.component';
import { ResourceService } from '@services/resource/resource.service';
import { CollectionService } from '@services/collection/collection.service';
import { UserService } from '@services/user/user.service';
import { environment as ENV } from '@environments/environment';

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
  image = '';
  userImage = '';
  timestamp: any;
  commentCount = 0;
  recommended_by_count: number;

  // Icons
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faPlus = faPlus;
  faReply = faReply;
  faEllipsisV = faEllipsisV;

  // Form
  commentForm: FormGroup;

  // Toggles
  isLoading = false;
  isInCollection = false;
  isLiked = false;
  showComments = false;
  isSeeMore = false;
  truncateValue = 150;

  // Empty states
  noPhoto = `${ENV.SITE_URL}/assets/images/portrait.jpg`;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private resourceService: ResourceService,
    private userService: UserService,
    private collectionService: CollectionService) { }

  async ngOnInit() {
    this.currentUser = localStorage.getItem('username');
    try {
      this.isLoading = true;
      await Promise.all([
        this.populatePost(),
        this.getCommentsCount(),
        this.getUserImage(this.data.username),
        this.checkIfPostInCollection(this.data._id, this.data.username),
        this.checkIfPostIsLiked(this.data._id, this.currentUser),
        this.init_comment_form(),
        this.checkIfDescriptionTooLong(this.description)
      ]);
      this.isLoading = false;
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
    this.recommended_by_count = this.data.recommended_by_count;
  }

  async getCommentsCount() {
    const result = await this.resourceService.getResourceCommentsCount({ resourceId: this.id});
    this.commentCount = result;
  }

  async getUserImage(username) {
    const result = await this.resourceService.getUserImage(username);
    this.userImage = result.image ? result.image : this.noPhoto;
  }

  async checkIfPostInCollection(id: string, username: string) {
    const result = await this.collectionService.checkForResourceInCollection({ id, username: this.currentUser });
    if (result.isInCollection) {
      this.isInCollection = true;
    }
  }

  async checkIfPostIsLiked(id: string, username: string) {
    const result = await this.userService.checkIfPostIsLiked({resourceId: id, username});
    if (result) {
      this.isLiked = true;
      return;
    }

    this.isLiked = false;
  }

  async init_comment_form() {
    this.commentForm = this.fb.group({
      resourceId: [this.id],
      username: [this.currentUser],
      comment: ['', Validators.required]
    });
  }

  async addComment() {
    const result = await this.resourceService.addComment(this.commentForm.value);

    if (result && result.status) {
      // * Clear textarea
      this.commentForm.controls.comment.patchValue('');

      // * Add Comment to commentCount array
      this.commentCount++;
    }
  }

  formatTime(date: Date) {
    return moment(date).fromNow();
  }

  async textareaEnterPressed($event: KeyboardEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    if (this.commentForm.valid) {
      await this.addComment();
    }
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

  async like() {
    try {
      const result = await this.userService.likePost({username: this.currentUser, resourceId: this.id});
      if (result) {
        this.isLiked = true;
        this.recommended_by_count++;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async unlike() {
    try {
      const result = await this.userService.unLikePost({username: this.currentUser, resourceId: this.id});
      if (result) {
        this.isLiked = false;
        this.recommended_by_count--;
      }
    } catch (err) {
      console.error(err);
    }
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
