import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-ff',
  templateUrl: './ff.component.html',
  styleUrls: ['./ff.component.scss']
})
export class FfComponent implements OnInit {
  username: string;
  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    await this.getUserFollowers();
  }

  async getUserFollowers() {
    const response = await this.userService.getFollowersFollowing(this.username);
    console.log(response);
  }

}
