import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackbarService } from '@services/general/snackbar.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '@services/profile/profile.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-cpi',
  templateUrl: './cpi.component.html',
  styleUrls: ['./cpi.component.scss']
})
export class CpiComponent implements OnInit {
  defaultProfileImage = '../../../../assets/portrait.jpg';
  userImage: any;
  isNewImage = false;
  faTrash = faTrash;
  selectedFile: ImageSnippet;
  @ViewChild('imageInput') imageInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<CpiComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackbarService: SnackbarService,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.userImage = this.data.image;
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
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
  }

  saveProfilePhoto() {
    this.profileService.saveProfilePhoto({ image: this.userImage }).then((res) => {
      console.log(res);
      if (res === null) {
        this.snackbarService.openSnackBar({
          message: {
            message: `Something went wrong!`,
            error: true
          },
          class: 'red-snackbar',
        });
      } else if (!res.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: 'Profile photo updated!',
            error: false
          },
          class: 'green-snackbar',
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
    });
  }

}
