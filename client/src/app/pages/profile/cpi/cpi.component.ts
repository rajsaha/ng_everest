import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackbarService } from '@services/general/snackbar.service';

@Component({
  selector: 'app-cpi',
  templateUrl: './cpi.component.html',
  styleUrls: ['./cpi.component.scss']
})
export class CpiComponent implements OnInit {
  defaultProfileImage = '../../../../assets/portrait.jpg';
  userImage: any;
  isNewImage = false;

  constructor(public dialogRef: MatDialogRef<CpiComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.userImage = this.data.image;
  }

  onFileSelected(files) {
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Please upload an image',
          error: true
        },
        class: 'red-snackbar',
      });
      return;
    }
    this.isNewImage = true;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.userImage = reader.result;
    }
  }

  clearImage() {
    this.isNewImage = false;
    this.userImage = null;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
  }

}
