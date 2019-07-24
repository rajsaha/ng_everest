import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollectionService } from '@services/collection/collection.service';

@Component({
  selector: 'app-atc',
  templateUrl: './atc.component.html',
  styleUrls: ['./atc.component.scss']
})
export class AtcComponent implements OnInit {
  username: string;
  collectionNames = [];

  // Form
  addToCollectionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AtcComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private collectionService: CollectionService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.getCollectionNames();
    this.checkForResourceInCollection();
    this.initAddToCollectionForm();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
  }

  initAddToCollectionForm() {
    this.addToCollectionForm = this.fb.group({
      collectionName: ['']
    });
  }

  async getCollectionNames() {
    const response = await this.collectionService.getCollectionNames({ username: this.username });
    if (response.collections) {
      for (const item of response.collections) {
        this.collectionNames.push(item.title);
      }
    }
  }

  async checkForResourceInCollection() {
    const response = await this.collectionService.checkForResourceInCollection({id: this.data.id});
    console.log(response);
  }
}
