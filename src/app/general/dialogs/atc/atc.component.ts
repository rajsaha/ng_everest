import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  collections = [];
  currentCollectionName = '';

  // Form
  addToCollectionForm: FormGroup;

  // Pagination
  pageNo = 1;
  size = 5;

  // Toggles
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AtcComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private resourceService: ResourceService,
    private collectionService: CollectionService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {}

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

  async onScrollDown() {
    await this.loadMorePosts();
  }

  async loadMorePosts() {
    this.pageNo++;
    await this.getCollectionNames();
  }

  async initAddToCollectionForm() {
    this.addToCollectionForm = this.fb.group({
      collectionName: ['', Validators.required]
    });
  }

  get addToCollectionFormControls() {
    return this.addToCollectionForm.controls;
  }

  async getCollectionNames() {
    this.isLoading = true;
    const response = await this.collectionService.getCollectionNames({
      pageNo: this.pageNo,
      size: this.size,
      username: this.username
    });
    this.isLoading = false;

    if (response.collections) {
      for (const collection of response.collections) {
        this.collections.push(collection);
      }
    }
  }

  async checkForResourceInCollection() {
    const response = await this.collectionService.checkForResourceInCollection({
      id: this.data.id,
      username: this.username
    });
  }

  async getCollectionTitle(resourceId: string) {
    const collection = await this.collectionService.getCollectionTitleByResourceId(
      { username: this.username, resourceId }
    );

    if (collection.collection) {
      this.currentCollectionName = collection.collection.title;
    }
  }

  async submitAddToCollectionForm() {
    console.log(this.addToCollectionForm.value);
    return;
    if (this.addToCollectionForm.valid) {
      const response: any = await this.resourceService.editResourceCollection({
        collectionTitle: this.addToCollectionForm.controls.collectionName.value,
        resourceId: this.data.id,
        username: this.username
      });

      if (response && !response.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: `Resource added to ${this.addToCollectionForm.controls.collectionName.value}`,
            error: false
          },
          class: 'green-snackbar'
        });
        this.dialogRef.close({ added: true });
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: `Something went wrong!`,
            error: true
          },
          class: 'red-snackbar'
        });
      }
    }
  }

  setCollectionId(collectionId: string) {
    if (collectionId) {
      this.addToCollectionFormControls.collectionId.patchValue(collectionId);
    } else {
      this.addToCollectionFormControls.collectionId.reset();
    }
    console.log(this.addToCollectionForm.value);
  }
}
