import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dr',
  templateUrl: './dr.component.html',
  styleUrls: ['./dr.component.scss']
})
export class DrComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DrComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
  }

}
