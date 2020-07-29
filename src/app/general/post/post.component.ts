import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  faThumbsUp,
  faComment,
  faPlus,
  faReply,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AtcComponent } from '../dialogs/atc/atc.component';
import { PoComponent } from './po/po.component';
import { ResourceService } from '@services/resource/resource.service';
import { CollectionService } from '@services/collection/collection.service';
import { UserService } from '@services/user/user.service';
import { CommentComponent } from './comment/comment.component';
import { environment as ENV } from '@environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverService } from '@services/popover/popover.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() data: any;
  @Input() currentUser: string;
  @Input() currentUserId: string;
  @Input() noTruncation = false;

  @ViewChild(CommentComponent)
  commentComponent: CommentComponent;

  // Data
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  url: string;
  title: string;
  type: string;
  tags = [];
  description: string;
  image = '';
  smImage = '';
  userImage = '';
  timestamp: any;
  commentCount = 0;
  recommendedByCount: number;

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
  showComments = true;
  isSeeMore = false;
  truncateValue = 150;

  // Empty states
  noPhoto = `${ENV.SITE_URL}/assets/images/portrait.jpg`;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private resourceService: ResourceService,
    private userService: UserService,
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    private router: Router,
    private popper: PopoverService
  ) {}

  async ngOnInit() {
    this.populatePost();
    this.init_comment_form();
    this.checkIfDescriptionTooLong(this.description)
    try {
      this.isLoading = true;
      await Promise.all([
        this.getCommentsCount(),
        this.checkIfPostInCollection(this.data._id, this.data.username),
        this.checkIfPostIsLiked(this.data._id, this.currentUser),
      ]);
      this.isLoading = false;
    } catch (err) {
      throw new Error(err);
    }
  }

  populatePost() {
    this.id = this.data._id;
    this.username = this.data.username;
    this.firstName = this.data.firstName;
    this.lastName = this.data.lastName;
    this.url = this.data.url;
    this.title = this.data.title;
    this.type = this.data.type;
    this.tags = this.data.tags;
    this.description = this.data.description;
    this.image = this.data.lgImage.link ? this.data.lgImage.link : "";
    this.userImage = this.data.userImage ? this.data.userImage : this.noPhoto;
    this.timestamp = moment(this.data.timestamp).fromNow();
    this.recommendedByCount = this.data.recommended_by_count;

    if (this.type === 'article') {
      this.truncateValue = 500;
    }
  }

  async getCommentsCount() {
    const result: any = await this.resourceService.getResourceCommentsCount({
      resourceId: this.id
    });
    this.commentCount = result;
  }

  async checkIfPostInCollection(id: string, username: string) {
    const result: any = await this.collectionService.checkForResourceInCollection({
      id,
      username: this.currentUser
    });
    if (result.isInCollection) {
      this.isInCollection = true;
    }
  }

  async checkIfPostIsLiked(id: string, username: string) {
    const result: any = await this.userService.checkIfPostIsLiked({
      resourceId: id,
      userId: this.currentUserId
    });
    if (result) {
      this.isLiked = true;
      return;
    }

    this.isLiked = false;
  }

  init_comment_form() {
    this.commentForm = this.fb.group({
      resourceId: [this.id],
      firstName: [this.firstName[0]],
      lastName: [this.lastName[0]],
      username: [this.currentUser],
      comment: ['', Validators.required],
      timestamp: [Date.now()]
    });
  }

  async addComment() {
    this.showComments = true;
    const result: any = await this.resourceService.addComment(
      this.commentForm.value,
      localStorage.getItem("profileImage")
    );

    if (result && result.status) {
      // * Add comment to array
      this.commentComponent.addCommentToArray({
        username: this.commentFormControls.username.value,
        content: this.commentFormControls.comment.value,
        timestamp: this.commentFormControls.timestamp.value
      });
      // * Clear textarea
      this.commentForm.controls.comment.patchValue('');

      // * Add Comment to commentCount array
      await this.getCommentsCount();
    }
  }

  get commentFormControls() {
    return this.commentForm.controls;
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

  async like() {
    try {
      const result = await this.userService.likePost({
        userId: this.currentUserId,
        resourceId: this.id
      });
      if (result) {
        this.isLiked = true;
        this.recommendedByCount++;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async unlike() {
    try {
      const result = await this.userService.unLikePost({
        userId: this.currentUserId,
        resourceId: this.id
      });
      if (result) {
        this.isLiked = false;
        this.recommendedByCount--;
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
        title: this.title,
        image: this.image,
        description: this.description
      }
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result && result.added) {
        const res = await this.collectionService.checkForResourceInCollection({
          id: this.id
        });
        if (res) {
          this.isInCollection = true;
        }
      }
    });
  }

  checkIfDescriptionTooLong(text: string) {
    if (!this.noTruncation) {
      if (text.length > this.truncateValue) {
        this.isSeeMore = true;
      }
    } else {
      this.truncateValue = 9999999;
    }
  }

  seeMore() {
    if (this.type === 'article') {
      this.openResource();
    } else {
      this.truncateValue = 1000;
      this.isSeeMore = false;
    }
  }

  openResource() {
    if (this.type === 'ext-content') {
      window.open(this.url, '_blank');
    } else {
      this.router.navigate([`/profile/user/${this.username}/resource/${this.id}`], { relativeTo: this.route.parent });
    }
  }

  show(origin: HTMLElement) {
    const ref = this.popper.open<{}>({
      content: PoComponent,
      origin,
      data: {
        resourceId: this.id,
        username: this.username
      }
    });

    ref.afterClosed$.subscribe(res => {
        //
    })
  }
}
