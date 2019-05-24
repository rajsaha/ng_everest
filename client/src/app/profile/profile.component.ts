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

  profileForm = this.fb.group({
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

    // Get User Data
    this.getUserData();

    //Init Form Data
    this.initFormData();
  }

  saveProfileForm() {
    console.log(this.profileForm.value);
  }

  changePasswordForm() {
    console.log(this.passwordForm.value);
  }

  getUserData() {
    this.profileService.getProfileData(this.username).then((res) => {
      console.table(res);
    });
  }

  initFormData() {
    this.profileForm.controls['username'].patchValue(this.username);
  }
}
