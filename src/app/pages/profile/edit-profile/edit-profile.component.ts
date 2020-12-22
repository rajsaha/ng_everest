import { Component, OnInit } from "@angular/core";
import { faExternalLinkAlt, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "@services/user/user.service";
import { SnackbarService } from "@services/general/snackbar.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { CpiComponent } from "src/app/components/dialogs/cpi/cpi.component";
import { FfComponent } from "src/app/components/dialogs/ff/ff.component";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  // Profile data
  username: string;
  userId: string;
  firstName: string;
  lastName: string;
  website: string;
  bio: string;
  email: string;
  followers = 0;
  following = 0;
  image: string;
  uploadedImage: string;
  imageId: string;
  deleteHash: string;
  interests = [];
  submitButtonText = "Save";

  // Toggles
  isLoading = false;
  isPublicView = true;

  profileProgress = 0;

  // Icons
  faExternalLinkAlt = faExternalLinkAlt;
  faUserFriends = faUserFriends;

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
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.username = localStorage.getItem("username");
    this.userId = localStorage.getItem("userId");

    // Init Forms
    this.initProfileForm();
    this.onEmailChange();

    // Get User Data
    await this.getUserData();
    this.isPublicView = false;
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: [{ value: "", disabled: true }],
      website: [""],
      bio: [""],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
  }

  onEmailChange() {
    this.profileForm.controls.email.valueChanges.pipe(distinctUntilChanged(), debounceTime(300)).subscribe(async (val) => {
      if (val && !this.profileFormControls.email.invalid) {
        const result: any = await this.userService.checkEmail({ email: val });
        
        // * Email exists
        if (result.data) {
          // ! Email belongs to someone else
          if (result.data._id !== this.userId) {
            this.profileFormControls.email.setErrors({ canUseEmail: true });
          } else {
            this.profileFormControls.email.setErrors({ canUseEmail: null });
            this.profileFormControls.email.updateValueAndValidity();
          }
        }
      }
    });
  }

  get profileFormControls() {
    return this.profileForm.controls;
  }

  async getUserData() {
    this.isLoading = true;
    const res: any = await this.userService.getProfileData({ userId: this.userId });

    this.interests = res.userData.interests ? res.userData.interests : [];
    this.followers = res.userData.followerCount;
    this.following = res.userData.followingCount;

    if (res.userData.mdImage instanceof Object) {
      this.image = res.userData.mdImage.link ? res.userData.mdImage.link : "";
      this.uploadedImage = res.userData.mdImage.link;
      this.imageId = res.userData.mdImage.id;
      this.deleteHash = res.userData.mdImage.deleteHash;
    }

    this.initFormData({
      username: res.userData.username,
      firstName: res.userData.firstName,
      lastName: res.userData.lastName,
      website: res.userData.website,
      bio: res.userData.bio,
      email: res.userData.email
    });

    // Calculate profile progress
    this.profileProgress = 0;
    this.calculateProgress();
    this.isLoading = false;
  }

  initFormData(data: any) {
    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.website = data.website;
    this.bio = data.bio;
    this.email = data.email;

    // Form Control Values
    this.profileForm.controls.username.patchValue(data.username);
    this.profileForm.controls.firstName.patchValue(data.firstName);
    this.profileForm.controls.lastName.patchValue(data.lastName);
    this.profileForm.controls.website.patchValue(data.website);
    this.profileForm.controls.bio.patchValue(data.bio);
    this.profileForm.controls.email.patchValue(data.email);
  }

  openCpiDialog() {
    const dialogRef = this.dialog.open(CpiComponent, {
      data: {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        image: this.image
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result.newImage) {
        this.isLoading = true;
        this.image = result.image;
        this.isLoading = false;
      }
    });
  }

  addInterest(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.interests.push(value.toLocaleLowerCase());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  async removeInterest(interest) {
    const index = this.interests.indexOf(interest);
    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

  calculateProgress() {
    if (this.firstName) {
      this.alterProgress(true);
    }

    if (this.lastName) {
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
        this.profileProgress += 20;
      }
    } else {
      if (this.profileProgress > 0) {
        this.profileProgress -= 20;
      }
    }
  }

  async saveProfileForm() {
    if (this.profileForm.invalid) {
      this.profileFormControls.firstName.markAsDirty();
      this.profileFormControls.lastName.markAsDirty();
      this.profileFormControls.email.markAsDirty();
      return;
    }

    const data = {
      id: this.userId,
      firstName: this.profileForm.controls.firstName.value,
      lastName: this.profileForm.controls.lastName.value,
      website: this.profileForm.controls.website.value,
      bio: this.profileForm.controls.bio.value,
      interests: this.interests,
      email: this.profileForm.controls.email.value
    };

    this.isLoading = true;
    this.submitButtonText = "Saving...";

    const res: any = await this.userService.updateProfileData(data);

    this.isLoading = false;
    this.submitButtonText = "Save";

    if (!res.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: "Profile data saved!",
          error: false
        },
        class: "green-snackbar"
      });
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Error: ${res.error}!`,
          error: true
        },
        class: "red-snackbar"
      });
    }
  }

  openFollowDialog() {
    const dialogRef = this.dialog.open(FfComponent, {
      data: {
        userId: this.userId
      }
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {});
  }

  goToSearch(query: string) {
    this.router.navigate([`/search`], {
      queryParams: { query },
      relativeTo: this.route.parent
    });
  }
}
