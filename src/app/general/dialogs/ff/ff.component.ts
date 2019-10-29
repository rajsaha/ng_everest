import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ff',
  templateUrl: './ff.component.html',
  styleUrls: ['./ff.component.scss']
})
export class FfComponent implements OnInit {
  username: string;
  followers = [];
  following = [];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    console.log(this.data);
    this.username = localStorage.getItem('username');
    await this.getUserFollowers();
  }

  async getUserFollowers() {
    const response: any = await this.userService.getFollowersFollowing(this.data.username);
    for (const user of response.followers) {
      this.followers.push(user);
    }

    for (const user of response.following) {
      this.following.push(user);
    }
  }

}
