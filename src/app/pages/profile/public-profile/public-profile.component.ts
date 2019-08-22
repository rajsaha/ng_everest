import { Component, OnInit } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '@services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  // Icons
  faExternalLinkAlt = faExternalLinkAlt;

  // Profile data
  username: string;
  userId: string;
  name: string;
  website: string;
  bio: string;
  email: string;
  image = '../../../assets/portrait.jpg';
  interests = [];
  defaultProfileImage = '../../../assets/portrait.jpg';

  // Resources
  resources = [];

  // Collections
  collections = [];

  // Toggles
  isLoading = false;

  constructor(private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(async (params) => {
      await this.getPublicProfile(params.id);
    });
  }

  async getPublicProfile(username: string) {
    this.isLoading = true;
    const result = await this.userService.getPublicProfile(username);
    this.isLoading = false;

    // * Separating the individual parts
    const profileData = result.profileData.userData;
    const userCollections = result.userCollections.collections;
    const userResources = result.userResources.resources;

    // * Assigning data
    this.setProfileData(profileData);
    this.setResources(userResources);
    this.setCollections(userCollections);
  }

  setProfileData(data: any) {
    this.username = data.username;
    this.name = data.name;
    this.website = data.website;
    this.bio = data.bio;
    this.email = data.email;
    this.image = data.image.link;
    this.interests = data.interests;
  }

  setResources(data: any) {
    this.resources = data;
  }

  setCollections(data: any) {
    this.collections = data;
  }

}
