import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = this.fb.group({
    name: [''],
    username: [''],
    website: [''],
    bio: [''],
    email: [''],
    phoneNumber: ['']
  });

  passwordForm = this.fb.group({
    currentPass: [''],
    newPass: [''],
    newPassConfirm: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  saveProfileForm() {
    console.log(this.profileForm.value);
  }

  changePasswordForm() {
    console.log(this.passwordForm.value);
  }

}
