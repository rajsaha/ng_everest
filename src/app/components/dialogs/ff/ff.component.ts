import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "@services/user/user.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-ff",
  templateUrl: "./ff.component.html",
  styleUrls: ["./ff.component.scss"],
})
export class FfComponent implements OnInit {
  username: string;
  anchorUserId: string;
  followers = [];
  following = [];

  // Toggles
  isLoading = false;

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    this.username = localStorage.getItem("username");
    this.anchorUserId = localStorage.getItem("userId");
    await this.getUserFollowers();
  }

  async getUserFollowers() {
    this.isLoading = true;
    const response: any = await this.userService.getFollowersFollowing({
      userId: this.data.userId,
    });
    for (const user of response.data.followers) {
      this.followers.push(user.followers[0]);
    }

    for (const user of response.data.followings) {
      this.following.push(user.followings[0]);
    }
    this.isLoading = false;
  }

  onScrollDown() {
    console.log("asd");
  }

  async unfollow(userId: string) {
    const result: any = await this.userService.unfollowUser({
      anchorUserId: this.anchorUserId,
      userId
    });

    if (!result.error) {
      this.followers = [];
      this.following = [];
      await this.getUserFollowers();
    }
  }
}
