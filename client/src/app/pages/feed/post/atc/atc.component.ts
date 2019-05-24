import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-atc',
  templateUrl: './atc.component.html',
  styleUrls: ['./atc.component.scss']
})
export class AtcComponent {
  mockData = [
    {
      id: 1,
      name: 'Collection 1'
    },
    {
      id: 2,
      name: 'Collection 2'
    }
  ];

  faPlus = faPlus;

  constructor(
    public dialogRef: MatDialogRef<AtcComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
  }

}
