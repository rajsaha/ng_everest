import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackbarService } from '@services/general/snackbar.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<CpiComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.userImage = this.data.image;
  }

  onFileSelected(files) {
    if (files.length === 0) {
      return;
    }

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
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.userImage = reader.result;
    };
  }

  clearImage() {
    if (this.isNewImage) {
      this.isNewImage = false;
      this.userImage = null;
      this.fileInput.nativeElement.value = '';
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

}
