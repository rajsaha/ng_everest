import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cpi',
  templateUrl: './cpi.component.html',
  styleUrls: ['./cpi.component.scss']
})
export class CpiComponent {
  defaultProfileImage = '../../../../assets/portrait.jpg';

  constructor(public dialogRef: MatDialogRef<CpiComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
  }

}
