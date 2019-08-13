import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollectionService } from '@services/collection/collection.service';
import { ResourceService } from '@services/resource/resource.service';
import { SnackbarService } from '@services/general/snackbar.service';

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
    private resourceService: ResourceService,
    private collectionService: CollectionService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.username = localStorage.getItem('username');

    try {
      await Promise.all([
        this.getCollectionNames(),
        this.checkForResourceInCollection(),
        this.initAddToCollectionForm(),
        this.getCollectionTitle(this.data.id)
      ]);
    } catch (err) {
      throw new Error(err);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
  }

  async initAddToCollectionForm() {
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
    const response = await this.collectionService.checkForResourceInCollection({ id: this.data.id });
  }

  async getCollectionTitle(resourceId: string) {
    const collection = await this.collectionService.getCollectionTitleByResourceId({ resourceId });
    if (collection.collection) {
      this.addToCollectionForm.controls.collectionName.patchValue(collection.collection.title);
    }
  }

  async submitAddToCollectionForm() {
    if (this.addToCollectionForm.valid) {
      const response: any = this.resourceService.editResourceCollection({
        collectionName: this.addToCollectionForm.controls.collectionName.value,
        resourceId: this.data.id,
        username: this.username
      });

      if (!response.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: `Resource added to ${this.addToCollectionForm.controls.collectionName.value}`,
            error: false
          },
          class: 'green-snackbar',
        });
        this.dialogRef.close({added: true});
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: `Error: ${response.error}!`,
            error: true
          },
          class: 'red-snackbar',
        });
      }
    }
  }
}
