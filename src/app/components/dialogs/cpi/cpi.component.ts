import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '@services/general/snackbar.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '@services/user/user.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-cpi',
  templateUrl: './cpi.component.html',
  styleUrls: ['./cpi.component.scss']
})
export class CpiComponent implements OnInit {
  userImage: any;
  isNewImage = false;
  imageFromDB = false;
  isSavingPhoto = false;
  isReady = false;
  isLocalImage = false;

  // Icons
  faTrash = faTrash;

  userId: string;
  imageId: string;
  deleteHash: string;
  selectedFile: ImageSnippet;
  @ViewChild('imageInput', { static: true }) imageInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<CpiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService,
    private userService: UserService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (this.data.image instanceof Object) {
      this.userImage = this.data.image.mdImage.link;
      this.imageFromDB = this.data.image.mdImage.link ? true : false;
    }
    this.isReady = true;
    // this.getProfilePhoto();
  }

  getProfilePhoto() {
    this.userService.getProfilePhoto(this.data.username).then((res: any) => {
      if (res.mdImage) {
        this.userImage = res.mdImage.link;
        this.imageFromDB = res.mdImage.link ? true : false;
      }
    });
  }

  onFileSelected(imageInput: any) {
    this.isNewImage = true;
    const file: File = imageInput.files[0];
    const reader: FileReader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.isReady = false;
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.userImage = event.target.result;
      this.isLocalImage = true;
      this.isReady = true;
    });
    reader.readAsDataURL(file);
  }

  clearImage() {
    if (this.isNewImage) {
      this.isLocalImage = false;
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
      newImage: false
    });
  }

  async saveProfilePhoto() {
    // * Pre api call
    this.isSavingPhoto = true;
    this.dialogRef.disableClose = true;
    const response: any = await this.userService.saveProfilePhoto(
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
      localStorage.setItem('profileImage', response.smImage.link);
      this.dialogRef.close({
        newImage: true,
        image: response.mdImage.link
      });
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
    const response: any = await this.userService.deleteProfilePhoto({ id: this.userId });

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
