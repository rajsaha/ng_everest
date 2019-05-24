import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from '@services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  userId: string;
  name: string;
  website: string;
  bio: string;
  email: string;

  profileForm = this.fb.group({
    _id: [''],
    name: [''],
    username: [{value: '' , disabled: true}],
    website: [''],
    bio: [''],
    email: ['']
  });

  passwordForm = this.fb.group({
    currentPass: [''],
    newPass: [''],
    newPassConfirm: ['']
  });

  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('userId');

    // Get User Data
    this.getUserData();
  }

  saveProfileForm() {
    console.log(this.profileForm.value);
    this.profileService.updateProfileData(this.profileForm.value).then((res) => {
      console.log(res);
    });
  }

  changePasswordForm() {
    console.log(this.passwordForm.value);
  }

  getUserData() {
    this.profileService.getProfileData(this.username).then((res: any) => {
      this.initFormData({
        _id: res.userData._id,
        username: res.userData.username,
        name: res.userData.name,
        website: res.userData.website,
        bio: res.userData.bio,
        email: res.userData.email
      });
    });
  }

  initFormData(data: any) {
    this.profileForm.controls['_id'].patchValue(data._id);
    this.profileForm.controls['username'].patchValue(data.username);
    this.profileForm.controls['name'].patchValue(data.name);
    this.profileForm.controls['website'].patchValue(data.website);
    this.profileForm.controls['bio'].patchValue(data.bio);
    this.profileForm.controls['email'].patchValue(data.email);
  }
}
