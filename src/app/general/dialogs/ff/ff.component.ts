import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ff',
  templateUrl: './ff.component.html',
  styleUrls: ['./ff.component.scss']
})
export class FfComponent implements OnInit {
  username: string;
  followers = [];
  following = [];

  // Toggles
  isLoading = false;

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    await this.getUserFollowers();
  }

  async getUserFollowers() {
    this.isLoading = true;
    const response: any = await this.userService.getFollowersFollowing(
      this.data.username
    );
    this.isLoading = false;
    for (const user of response.followers) {
      this.followers.push(user);
    }

    for (const user of response.following) {
      this.following.push(user);
    }
  }

  onScrollDown() {
    console.log('asd');
  }
}
