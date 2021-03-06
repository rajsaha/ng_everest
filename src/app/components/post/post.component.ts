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
import { AtcComponent } from '../dialogs/atc/atc.component';
import { PoComponent } from './po/po.component';
import { ResourceService } from '@services/resource/resource.service';
import { CollectionService } from '@services/collection/collection.service';
import { UserService } from '@services/user/user.service';
import { CommentComponent } from './comment/comment.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverService } from '@services/popover/popover.service';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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
  userId: string;
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
  comments: any;
  recommendedByCount: number;
  noImage: boolean;
  backgroundColor: string;
  textColor: string;

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
    try {
      this.isLoading = true;
      this.populatePost();
      this.init_comment_form();
      this.checkIfDescriptionTooLong(this.description)
      this.isLoading = false;
    } catch (err) {
      throw new Error(err);
    }
  }

  populatePost() {
    this.id = this.data._id;
    this.userId = this.data.userId;
    this.username = this.data.username;
    this.firstName = this.data.firstName;
    this.lastName = this.data.lastName;
    this.url = this.data.url;
    this.title = this.data.title;
    this.type = this.data.type;
    this.tags = this.data.tags;
    this.description = this.data.description;
    this.image = this.data.lgImage.link ? this.data.lgImage.link : "";
    this.userImage = this.data.userImage;
    this.timestamp = dayjs(this.data.timestamp).fromNow();
    this.recommendedByCount = this.data.recommended_by_count;
    this.noImage = this.data.noImage;
    this.backgroundColor = this.data.backgroundColor;
    this.textColor = this.data.textColor;
    this.isLiked = this.data.isLikedByUser.length > 0 ? true : false;
    this.isInCollection = this.data.isInCollection.length > 0 ? true : false;
    this.commentCount = this.data.commentsCount;
    this.comments = this.data.comments;

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

  init_comment_form() {
    this.commentForm = this.fb.group({
      resourceId: [this.id],
      userId: [this.currentUserId],
      comment: ['', Validators.required],
      timestamp: [Date.now()]
    });
  }

  async addComment() {
    this.showComments = true;
    this.commentForm.controls.comment.disable();
    const result: any = await this.resourceService.addComment(
      this.commentForm.getRawValue()
    );
    this.commentForm.controls.comment.enable();

    if (!result.error) {
      // * Add comment to array
      this.commentComponent.addCommentToArray({
        firstName: result.data[0].firstName,
        lastName: result.data[0].lastName,
        username: result.data[0].username,
        content: result.data[0].content,
        image: result.data[0].image,
        timestamp: result.data[0].timestamp
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

  async textareaEnterPressed($event: KeyboardEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    if (this.commentForm.valid) {
      await this.addComment();
    }
  }

  async like() {
    try {
      this.isLiked = true;
      const result = await this.userService.likePost({
        userId: this.currentUserId,
        resourceId: this.id
      });
      
      if (result) {
        this.isLiked = true;
        this.recommendedByCount++;
      } else {
        this.isLiked = false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async unlike() {
    try {
      this.isLiked = false;
      const result = await this.userService.unLikePost({
        userId: this.currentUserId,
        resourceId: this.id
      });
      if (result) {
        this.isLiked = false;
        this.recommendedByCount--;
      } else {
        this.isLiked = true;
      }
    } catch (err) {
      console.error(err);
    }
  }

  openCollectionsDialog() {
    const dialogRef = this.dialog.open(AtcComponent, {
      minWidth: "300px",
      data: {
        id: this.id,
        url: this.url,
        title: this.title,
        image: this.image,
        description: this.description,
        backgroundColor: this.backgroundColor,
        textColor: this.textColor,
        noImage: this.noImage
      },
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      const res: any = await this.collectionService.checkForResourceInCollection({
        id: this.id,
        userId: this.currentUserId,
      });

      if (res.isInCollection) {
        this.isInCollection = true;
      } else {
        this.isInCollection = false;
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
      if (this.url.startsWith("http")) {
        window.open(this.url, '_blank');
      } else {
        window.open('http://' + this.url, '_blank');
      }
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
