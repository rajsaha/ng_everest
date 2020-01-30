import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  createCollectionForm: FormGroup;

  // Pagination
  pageNo = 1;
  size = 5;

  // Toggles
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AtcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    this.createCollectionForm = this.fb.group({
      collectionTitle: ['', Validators.required]
    });
  }

  get createCollectionFormControls() {
    return this.createCollectionForm.controls;
  }

  async getCollectionNames() {
    this.isLoading = true;
    const response: any = await this.collectionService.getCollectionNames({
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
    const response: any = await this.collectionService.checkForResourceInCollection({
      id: this.data.id,
      username: this.username
    });
  }

  async getCollectionTitle(resourceId: string) {
    const collection: any = await this.collectionService.getCollectionTitleByResourceId(
      { username: this.username, resourceId }
    );

    if (collection.collection.length > 0) {
      this.currentCollectionName = collection.collection[0].title;
    }
  }

  async addResourceToCollection(collectionId: string) {
    const response: any = await this.resourceService.addResourceToCollection({
      collectionId,
      resourceId: this.data.id,
      username: this.username
    });

    if (response && !response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: `Resource added to ${this.createCollectionForm.controls.collectionTitle.value}`,
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

  async submitCreateCollectionForm() {
    if (this.createCollectionForm.valid) {
      const response: any = await this.collectionService.createCollectionAndPushResource({
        collectionTitle: this.createCollectionForm.controls.collectionTitle.value,
        resourceId: this.data.id,
        username: this.username
      });

      if (response && !response.message.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: `Saved to collection`,
            error: false
          },
          class: 'green-snackbar'
        });
        this.dialogRef.close({ added: true });
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: response.message.message,
            error: true
          },
          class: 'red-snackbar'
        });
      }
    }
  }

  setCollectionId(collectionId: string) {
    if (collectionId) {
      this.createCollectionFormControls.collectionId.patchValue(collectionId);
    } else {
      this.createCollectionFormControls.collectionId.reset();
    }
    console.log(this.createCollectionForm.value);
  }
}
