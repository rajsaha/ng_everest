import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from '@services/profile/profile.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { MatDialog } from '@angular/material';
import { faEdit, faTrash, faEye, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { CpiComponent } from './cpi/cpi.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  // Profile data
  username: string;
  userId: string;
  name: string;
  website: string;
  bio: string;
  email: string;
  image: string;
  interests = [];
  defaultProfileImage = '../../../assets/portrait.jpg';

  // Toggles
  isLoading = false;
  isProfileSaveButtonDisabled = false;
  isPublicView = true;

  // Icons
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;
  faExternalLinkAlt = faExternalLinkAlt;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  profileForm = this.fb.group({
    _id: [''],
    name: [''],
    username: [{ value: '', disabled: true }],
    website: [''],
    bio: [''],
    email: [''],
    interests: []
  });

  passwordForm = this.fb.group({
    currentPass: [''],
    newPass: [''],
    newPassConfirm: ['']
  });

  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private snackbarService: SnackbarService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('userId');

    // Get User Data
    this.getUserData();
  }

  saveProfileForm() {
    console.log(this.profileForm.value);
    // this.profileService.updateProfileData(this.profileForm.value).then((res) => {
    //   if (!res.error) {
    //     this.snackbarService.openSnackBar({
    //       message: {
    //         message: 'Profile data saved!',
    //         error: false
    //       },
    //       class: 'green-snackbar',
    //     });
    //     this.name = res.newData.name;
    //     this.website = res.newData.website;
    //     this.email = res.newData.email;
    //     this.bio = res.newData.bio;
    //   } else {
    //     this.snackbarService.openSnackBar({
    //       message: {
    //         message: `Error: ${res.error}!`,
    //         error: true
    //       },
    //       class: 'red-snackbar',
    //     });
    //   }
    // });
  }

  changePasswordForm() {
    console.log(this.passwordForm.value);
  }

  getUserData() {
    this.profileService.getProfileData(this.username).then((res: any) => {
      this.isLoading = true;
      this.isProfileSaveButtonDisabled = true;
      this.interests = res.userData.interests;
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
    this.isLoading = false;
    this.isProfileSaveButtonDisabled = false;

    this.userId = data._id;
    this.image = data.image;
    this.username = data.username;
    this.name = data.name;
    this.website = data.website;
    this.bio = data.bio;
    this.email = data.email;

    // Form Control Values
    this.profileForm.controls._id.patchValue(data._id);
    this.profileForm.controls.username.patchValue(data.username);
    this.profileForm.controls.name.patchValue(data.name);
    this.profileForm.controls.website.patchValue(data.website);
    this.profileForm.controls.bio.patchValue(data.bio);
    this.profileForm.controls.email.patchValue(data.email);
  }

  openCpiDialog() {
    const dialogRef = this.dialog.open(CpiComponent, {
      data: {
        image: this.image
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addInterest(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.interests.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeInterest(interest): void {
    const index = this.interests.indexOf(interest);

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }
}
