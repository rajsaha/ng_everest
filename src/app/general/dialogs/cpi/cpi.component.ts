import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackbarService } from '@services/general/snackbar.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '@services/user/user.service';
import { environment as ENV } from '@environments/environment';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-cpi',
  templateUrl: './cpi.component.html',
  styleUrls: ['./cpi.component.scss']
})
export class CpiComponent implements OnInit {
  defaultProfileImage = `${ENV.SITE_URL}/assets/images/portrait.jpg`;
  userImage: any;
  isNewImage = false;
  imageFromDB = false;
  isSavingPhoto = false;

  // Icons
  faTrash = faTrash;

  userId: string;
  imageId: string;
  deleteHash: string;
  selectedFile: ImageSnippet;
  @ViewChild('imageInput', { static: true }) imageInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<CpiComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackbarService: SnackbarService,
    private userService: UserService) {
    this.userService.getProfilePhoto(data.username).then((res) => {
      if (res.image.image) {
        this.userImage = res.image.image.link ? res.image.image.link : this.defaultProfileImage;
        this.deleteHash = res.image.image.deleteHash;
        this.imageId = res.image.image.id;
        this.imageFromDB = res.image.image.link ? true : false;
      }
    });
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  onFileSelected(imageInput: any) {
    this.isNewImage = true;
    const file: File = imageInput.files[0];
    const reader: FileReader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.userImage = event.target.result;
    });

    reader.readAsDataURL(file);
  }

  clearImage() {
    if (this.isNewImage) {
      this.isNewImage = false;
      this.userImage = null;
      this.imageInput.nativeElement.value = '';
    } else {
      // Handle deletion of uploaded image
      this.deleteProfilePhoto();
    }
  }

  onNoClick() {
    this.dialogRef.close({
      status: false
    });
  }

  onYesClick() {
    this.dialogRef.close();
  }

  async saveProfilePhoto() {
    // * Pre api call
    this.isSavingPhoto = true;
    this.dialogRef.disableClose = true;
    const response = await this.userService.saveProfilePhoto(
      {
        id: this.userId,
        image: this.userImage,
        username: this.data.username
      }
    );

    // * Post api call
    this.dialogRef.disableClose = false;
    this.isSavingPhoto = false;

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Profile photo updated!',
          error: false
        },
        class: 'green-snackbar',
      });
      localStorage.setItem('profileImage', this.userImage);
      this.dialogRef.close();
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Something went wrong!`,
          error: true
        },
        class: 'red-snackbar',
      });
    }
  }

  async deleteProfilePhoto() {
    // * Pre api call
    this.isSavingPhoto = true;
    this.dialogRef.disableClose = true;
    const response = await this.userService.deleteProfilePhoto({ id: this.userId, deleteHash: this.deleteHash });

    // * Post api call
    this.dialogRef.disableClose = false;
    this.isSavingPhoto = false;

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Profile photo deleted!',
          error: false
        },
        class: 'green-snackbar',
      });

      localStorage.removeItem('profileImage');
      this.dialogRef.close();
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Something went wrong!`,
          error: true
        },
        class: 'red-snackbar',
      });
    }
  }
}
