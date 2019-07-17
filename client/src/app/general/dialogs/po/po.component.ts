import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.scss']
})
export class PoComponent implements OnInit {
  id: string;

  constructor(
    public dialogRef: MatDialogRef<PoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.data.id;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
