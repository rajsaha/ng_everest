import { Component, Inject, OnInit, NgZone, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CollectionService } from "@services/collection/collection.service";
import { ResourceService } from "@services/resource/resource.service";
import { SnackbarService } from "@services/general/snackbar.service";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-atc",
  templateUrl: "./atc.component.html",
  styleUrls: ["./atc.component.scss"]
})
export class AtcComponent implements OnInit {
  username: string;
  collections = [];
  currentCollectionId: string;
  currentCollectionName = "";
  isMobileViewport = false;

  // Form
  createCollectionForm: FormGroup;

  // Pagination
  pageNo = 1;
  size = 5;

  // Toggles
  isLoading = false;

  @ViewChild("autosize") autosize: CdkTextareaAutosize;

  constructor(
    public dialogRef: MatDialogRef<AtcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private resourceService: ResourceService,
    private collectionService: CollectionService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        if (result.matches) {
          this.isMobileViewport = true;
        } else {
          this.isMobileViewport = false;
        }
      });
  }

  async ngOnInit() {
    this.username = localStorage.getItem("username");

    try {
      await Promise.all([
        this.getCollections(),
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
    await this.getCollections();
  }

  async initAddToCollectionForm() {
    this.createCollectionForm = this.fb.group({
      collectionTitle: ["", Validators.required],
      description: [""]
    });
  }

  get createCollectionFormControls() {
    return this.createCollectionForm.controls;
  }

  async getCollections() {
    this.isLoading = true;
    const response: any = await this.collectionService.getCollections({
      pageNo: this.pageNo,
      size: this.size,
      username: this.username
    });

    if (!response.error) {
      for (const collection of response.collections[0].collections) {
        this.collections.push(collection);
      }
    }
    this.getCurrentCollectionId();
    this.isLoading = false;
  }

  async checkForResourceInCollection() {
    const response: any = await this.collectionService.checkForResourceInCollection(
      {
        id: this.data.id,
        username: this.username
      }
    );
  }

  getCurrentCollectionId() {
    for (let collection of this.collections) {
      if (collection.resource1) {
        if (collection.resource1._id === this.data.id) {
          this.currentCollectionId = collection._id;
        }
      }
  
      if (collection.resource2) {
        if (collection.resource2._id === this.data.id) {
          this.currentCollectionId = collection._id;
        }
      }
  
      if (collection.resource3) {
        if (collection.resource3._id === this.data.id) {
          this.currentCollectionId = collection._id;
        }
      }
  
      if (collection.resource4) {
        if (collection.resource4._id === this.data.id) {
          this.currentCollectionId = collection._id;
        }
      }
    }
  }

  async getCollectionTitle(resourceId: string) {
    const collection: any = await this.collectionService.getCollectionTitleByResourceId(
      { username: this.username, resourceId }
    );

    if (collection.collection.length > 0) {
      this.currentCollectionName = collection.collection[0].title;
    }
  }

  async addResourceToCollection(collection: any) {
    if (collection._id === this.currentCollectionId) {
      return;
    }

    let collectionId = collection._id;
    const response: any = await this.resourceService.addResourceToCollection({
      collectionId,
      resourceId: this.data.id,
      username: this.username,
      currentCollectionId: this.currentCollectionId ? this.currentCollectionId : null
    });

    if (response && !response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: `Resource added to ${collection.title}`,
          error: false
        },
        class: "green-snackbar"
      });
      this.dialogRef.close({ added: true });
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Something went wrong!`,
          error: true
        },
        class: "red-snackbar"
      });
    }
  }

  async submitCreateCollectionForm() {
    if (this.createCollectionForm.valid) {
      const response: any = await this.collectionService.createCollectionAndPushResource(
        {
          currentCollectionId: this.currentCollectionId ? this.currentCollectionId : null,
          collectionTitle: this.createCollectionForm.controls.collectionTitle
            .value,
          description: this.createCollectionForm.controls.description.value,
          resourceId: this.data.id,
          username: this.username
        }
      );

      if (response && !response.message.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: `Saved to collection`,
            error: false
          },
          class: "green-snackbar"
        });
        this.dialogRef.close({ added: true });
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: response.message.message,
            error: true
          },
          class: "red-snackbar"
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
  }

  triggerResize() {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
