import { Component, OnInit } from "@angular/core";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "@services/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment as ENV } from "@environments/environment";
import { ResourceService } from "@services/resource/resource.service";
import { MatDialog } from "@angular/material/dialog";
import { FfComponent } from "src/app/general/dialogs/ff/ff.component";

@Component({
  selector: "app-public-profile",
  templateUrl: "./public-profile.component.html",
  styleUrls: ["./public-profile.component.scss"]
})
export class PublicProfileComponent implements OnInit {
  // Icons
  faExternalLinkAlt = faExternalLinkAlt;

  // Profile data
  username: string;
  anchorUserId: string;
  userId: string;
  firstName: string;
  lastName: string;
  website: string;
  bio: string;
  email: string;
  following = [];
  followers = [];
  image = `${ENV.SITE_URL}/assets/images/portrait.jpg`;
  interests = [];
  defaultProfileImage = `${ENV.SITE_URL}/assets/images/portrait.jpg`;

  // Resources
  resources = [];
  resourcesCount = 0;

  // Collections
  collections = [];

  currentUser: string;
  paramUser: string;
  collectionUrl = "./collection";

  // Toggles
  isLoading = false;
  isFollowed = false;

  // Pagination
  pageNo = 1;
  size = 5;

  constructor(
    private userService: UserService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currentUser = localStorage.getItem("username");
    this.anchorUserId = localStorage.getItem("userId");
    this.route.params.subscribe(async params => {
      this.paramUser = params.username;
      await this.getPublicProfile(params.username);
    });
  }

  async getPublicProfile(username: string) {
    this.isLoading = true;
    const result: any = await this.userService.getPublicProfile({
      username,
      pageNo: this.pageNo,
      size: this.size
    });
    this.isLoading = false;

    // * Separating the individual parts
    const profileData = result.profileData.userData;
    const userCollections = result.userCollections.collections;

    // * Assigning data
    this.setProfileData(profileData);
    this.setCollections(userCollections);
  }

  async setProfileData(data: any) {
    this.userId = data._id;
    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.website = data.website;
    this.bio = data.bio;
    this.email = data.email;
    this.followers = data.followers;
    this.following = data.following;

    if (data.mdImage.link) {
      this.image = data.mdImage.link;
    }
    this.interests = data.interests;

    await this.checkIfUserIsFollowed(this.anchorUserId, this.userId);
  }

  setResources(data: any) {
    this.resources = data;
  }

  setCollections(data: any) {
    this.collections = data;
  }

  async checkIfUserIsFollowed(anchorUserId, userId) {
    const result: any = await this.userService.checkIfUserFollowed({
      anchorUserId,
      userId
    });

    if (result) {
      this.isFollowed = true;
    }
  }

  async follow() {
    const result: any = await this.userService.followUser({
      anchorUserId: this.anchorUserId,
      userId: this.userId
    });

    if (result) {
      this.isFollowed = true;
    }
  }

  async unfollow() {
    const result: any = await this.userService.unfollowUser({
      anchorUserId: this.anchorUserId,
      userId: this.userId
    });

    if (result) {
      this.isFollowed = false;
    }
  }

  async loadMorePosts() {
    this.pageNo++;
    await this.getUserResources();
  }

  async getUserResources(username?: any) {
    try {
      const response: any = await this.resourceService.getUserResources({
        pageNo: this.pageNo,
        size: this.size,
        username: username ? username : this.username
      });

      this.resourcesCount = response.count;

      for (const resource of response.resources) {
        this.resources.push(resource);
      }
    } catch (err) {
      console.error(err);
    }
  }

  openFollowDialog() {
    const dialogRef = this.dialog.open(FfComponent, {
      data: {
        username: this.paramUser
      }
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {});
  }

  goToSearch(query: string) {
    this.router.navigate([`/search`], { queryParams: { query }, relativeTo: this.route.parent });
  }
}
