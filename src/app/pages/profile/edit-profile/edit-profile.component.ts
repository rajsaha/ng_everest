import { Component, OnInit } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@services/user/user.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { CpiComponent } from 'src/app/general/dialogs/cpi/cpi.component';
import { environment as ENV } from '@environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  // Profile data
  username: string;
  userId: string;
  name: string;
  website: string;
  bio: string;
  email: string;
  image = `${ENV.SITE_URL}/assets/images/portrait.jpg`;
  uploadedImage: string;
  imageId: string;
  deleteHash: string;
  interests = [];
  defaultProfileImage = `${ENV.SITE_URL}/assets/images/portrait.jpg`;
  submitButtonText = 'Save';

  // Toggles
  isLoading = false;
  isProfileSaveButtonDisabled = false;
  isPublicView = true;

  profileProgress = 0;

  // Icons
  faExternalLinkAlt = faExternalLinkAlt;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('userId');

    // Init Forms
    this.initProfileForm();

    // Get User Data
    await this.getUserData();
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      name: [''],
      username: [{ value: '', disabled: true }],
      website: [''],
      bio: [''],
      email: ['']
    });
  }

  async getUserData() {
    this.isLoading = true;
    const res = await this.userService.getProfileData(this.username);
    this.isLoading = false;

    this.isProfileSaveButtonDisabled = true;
    this.interests = res.userData.interests;

    if (res.userData.image) {
      this.image = res.userData.image.link;
      this.uploadedImage = res.userData.image.link;
      this.imageId = res.userData.image.id;
      this.deleteHash = res.userData.image.deleteHash;
    } else {
      this.image = this.defaultProfileImage;
    }

    this.initFormData({
      username: res.userData.username,
      name: res.userData.name,
      website: res.userData.website,
      bio: res.userData.bio,
      email: res.userData.email
    });

    // Calculate profile progress
    this.profileProgress = 0;
    this.calculateProgress();
  }

  initFormData(data: any) {
    this.isLoading = false;
    this.isProfileSaveButtonDisabled = false;

    this.username = data.username;
    this.name = data.name;
    this.website = data.website;
    this.bio = data.bio;
    this.email = data.email;

    // Form Control Values
    this.profileForm.controls.username.patchValue(data.username);
    this.profileForm.controls.name.patchValue(data.name);
    this.profileForm.controls.website.patchValue(data.website);
    this.profileForm.controls.bio.patchValue(data.bio);
    this.profileForm.controls.email.patchValue(data.email);
  }

  openCpiDialog() {
    const dialogRef = this.dialog.open(CpiComponent, {
      data: {
        username: this.username
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result && result.status) {
        const imageLink = await this.userService.getProfilePhoto(this.username);
        this.image = imageLink.image.image.link
          ? imageLink.image.image.link
          : this.defaultProfileImage;
      }
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

  async removeInterest(interest) {
    const index = this.interests.indexOf(interest);
    const data = {
      id: this.userId,
      interest
    };

    const res = await this.userService.removeInterest(data);

    if (res.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Something went wrong!',
          error: true
        },
        class: 'red-snackbar'
      });
    } else {
      if (index >= 0) {
        this.interests.splice(index, 1);
      }
    }
  }

  calculateProgress() {
    if (this.name) {
      this.alterProgress(true);
    }

    if (this.bio) {
      this.alterProgress(true);
    }

    if (this.website) {
      this.alterProgress(true);
    }

    if (this.interests.length > 0) {
      this.alterProgress(true);
    }
  }

  alterProgress(bool: boolean) {
    if (bool) {
      if (this.profileProgress < 100) {
        this.profileProgress += 25;
      }
    } else {
      if (this.profileProgress > 0) {
        this.profileProgress -= 25;
      }
    }
  }

  async saveProfileForm() {
    const data = {
      id: this.userId,
      name: this.profileForm.controls.name.value,
      website: this.profileForm.controls.website.value,
      bio: this.profileForm.controls.bio.value,
      interests: this.interests,
      email: this.profileForm.controls.email.value
    };

    this.isLoading = true;
    this.submitButtonText = 'Saving...';

    const res = await this.userService.updateProfileData(data);

    this.isLoading = false;
    this.submitButtonText = 'Save';

    if (!res.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Profile data saved!',
          error: false
        },
        class: 'green-snackbar'
      });
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Error: ${res.error}!`,
          error: true
        },
        class: 'red-snackbar'
      });
    }
  }
}
