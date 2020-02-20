import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent implements OnInit {
  @Input() username: string;
  
  // Profile Data
  profileImage: string;
  name: string;
  bio = "No bio provided";
  interests = [];
  followers = [];
  followersCount = 0;
  articleCount = 0;
  extContentCount = 0;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    await this.getProfileData();
  }

  async getProfileData() {
    const result: any = await this.userService.getProfileData(this.username);
    console.log(result);
    this.profileImage = result.userData.mdImage.link;
    this.name = result.userData.name ? result.userData.name : result.userData.username;
    this.bio = result.userData.bio;
    this.interests = result.userData.interests;
    this.followers = result.followers;
    this.followersCount = result.followersCount;
    this.articleCount = result.articleCount;
    this.extContentCount = result.extContentCount;
  }

}
