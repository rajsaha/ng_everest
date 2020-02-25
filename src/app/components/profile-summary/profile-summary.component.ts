import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { environment as ENV } from "@environments/environment";

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent implements OnInit {
  @Input() username: string;
  
  // Profile Data
  profileImage: string;
  firstName: string;
  lastName: string;
  bio = "No bio provided";
  interests = [];
  followers = [];
  followersCount = 0;
  followingCount = 0;
  articleCount = 0;
  extContentCount = 0;
  defaultProfileImage = `${ENV.SITE_URL}/assets/images/portrait.jpg`;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    await this.getProfileData();
  }

  async getProfileData() {
    const result: any = await this.userService.getProfileData(this.username);
    console.log(result);
    if (result.userData.mdImage) {
      this.profileImage = result.userData.mdImage.link;
    } else {
      this.profileImage = this.defaultProfileImage;
    }
    
    this.firstName = result.userData.firstName;
    this.lastName = result.userData.lastName;
    this.bio = result.userData.bio;
    this.interests = result.userData.interests;
    this.followers = result.followers;
    this.followersCount = result.userData.followersCount;
    this.followingCount = result.userData.followingCount;
    this.articleCount = result.articleCount;
    this.extContentCount = result.extContentCount;
  }

}
