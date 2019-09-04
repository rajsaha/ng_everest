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

  currentUser: string;
  collectionUrl = './collection';

  // Toggles
  isLoading = false;
  isFollowed = false;

  constructor(private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('username');
    this.router.params.subscribe(async (params) => {
      await Promise.all([
        this.getPublicProfile(params.username),
        this.checkIfUserIsFollowed(this.currentUser, params.username)
      ]);
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

    if (data.image) {
      this.image = data.image.link;
    }
    this.interests = data.interests;
  }

  setResources(data: any) {
    this.resources = data;
  }

  setCollections(data: any) {
    this.collections = data;
  }

  async checkIfUserIsFollowed(currentUser, username) {
    const result = await this.userService.checkIfUserFollowed({
      currentUser,
      username
    });

    if (result) {
      this.isFollowed = true;
    }
  }

  async follow() {
    const result = await this.userService.followUser({
      currentUser: this.currentUser,
      username: this.username
    });

    if (result) {
      this.isFollowed = true;
    }
  }

  async unfollow() {
    const result = await this.userService.unfollowUser({
      currentUser: this.currentUser,
      username: this.username
    });

    if (result) {
      this.isFollowed = false;
    }
  }

}
