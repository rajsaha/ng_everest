import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { FfComponent } from '../dialogs/ff/ff.component';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent implements OnInit {
  @Input() userData: any;
  @Output() message = new EventEmitter<string>();

  loading = false;

  // Profile Data
  username: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  bio = "No bio provided";
  interests = [];
  followers = [];
  followerCount = 0;
  followingCount = 0;
  articleCount = 0;
  collectionCount = 0;
  extContentCount = 0;
  isLoggedInUserFollowingParamUser: number;

  constructor(private userService: UserService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    await this.getProfileData();
  }

  async getProfileData() {
    this.loading = true;
    const result: any = await this.userService.getProfileData(
      {
        userId: this.userData.userId,
        loggedInUserId: this.userData.loggedInUserId
      });
    if (result.userData.mdImage) {
      this.profileImage = result.userData.mdImage.link;
    } else {
      this.profileImage = "";
    }

    this.username = result.userData.username;
    this.firstName = result.userData.firstName;
    this.lastName = result.userData.lastName;
    this.bio = result.userData.bio;
    this.interests = result.userData.interests;
    this.followers = result.followerObjects;
    this.followerCount = result.userData.followerCount;
    this.followingCount = result.userData.followingCount;
    this.collectionCount = result.userData.collectionCount;
    this.articleCount = result.articleCount;
    this.extContentCount = result.extContentCount;
    this.isLoggedInUserFollowingParamUser = result.isLoggedInUserFollowingParamUser;
    this.loading = false;
  }

  followUser() {
    const result = this.userService.followUser({
      anchorUserId: this.userData.loggedInUserId,
      userId: this.userData.userId
    });

    if (result) {
      this.isLoggedInUserFollowingParamUser = 1;
    }
  }

  unfollowUser() {
    const result = this.userService.unfollowUser({
      anchorUserId: this.userData.loggedInUserId,
      userId: this.userData.userId
    });

    if (result) {
      this.isLoggedInUserFollowingParamUser = 0;
    }
  }

  openFollowDialog() {
    const dialogRef = this.dialog.open(FfComponent, {
      data: {
        userId: this.userData.loggedInUserId
      }
    });

    dialogRef.afterClosed().subscribe(async (result: any) => { });
  }

  goToSettings() {
    this.router.navigate(
      [`/profile/settings`],
      { relativeTo: this.route.parent }
    );
  }

  doBoxAction(action: string) {
    switch (action) {
      case "collection":
        this.message.emit("collection");
        break;
      case "posts":
        this.message.emit("posts");
        break;
      case "following":
        this.message.emit("following");
        break;
      default:
        break;
    }
  }

}
