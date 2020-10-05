import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CollectionService } from "@services/collection/collection.service";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setRefreshCollectionsToTrue } from "@services/ngrx/refreshCollections.actions";

@Component({
  selector: "app-edit-collection",
  templateUrl: "./edit-collection.component.html",
  styleUrls: ["./edit-collection.component.scss"],
})
export class EditCollectionComponent implements OnInit {
  form: FormGroup;
  resources = [];
  numOfResources: number;

  // Pagination
  pageNo = 1;
  size = 8;

  // Toggles
  isLoading = false;
  isChanged = false;

  constructor(
    public dialogRef: MatDialogRef<EditCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private store: Store<{ refreshCollectionsState: boolean }>
  ) {}

  async ngOnInit() {
    this.initForm();
    this.setData();
    await this.getCollection();
  }

  initForm() {
    this.form = this.fb.group({
      title: ["", Validators.required],
      description: [""],
    });
  }

  getFormControlValidity(control: string) {
    return this.form.controls[control].invalid;
  }

  setData() {
    this.form.setValue({
      title: this.data.collectionData.title,
      description: this.data.collectionData.description
        ? this.data.collectionData.description
        : "",
    });
  }

  async getCollection() {
    this.isLoading = true;
    const result: any = await this.collectionService.getCollectionById({
      pageNo: this.pageNo,
      size: this.size,
      id: this.data.collectionData._id,
    });
    this.numOfResources = result.collection.count;
    for (let item of result.collection.resources) {
      this.resources.push(item);
    }
    this.isLoading = false;
  }

  cancel() {
    this.setRefreshCollectionsToTrue();
    this.dialogRef.close();
  }

  async save() {
    const result: any = await this.collectionService.editCollectionDetails({
      id: this.data.collectionData._id,
      title: this.form.value.title,
      description: this.form.value.description
    });

    if (!result.error) {
      this.isChanged = true;
      this.setRefreshCollectionsToTrue();
      this.dialogRef.close();
    }
  }

  handleDeleteResourceEvent(eventData: any) {
    if (eventData.isDeleted) {
      this.isChanged = true;
      let index = this.resources.indexOf(eventData.resource);
      this.resources.splice(index);
    }
  }

  setRefreshCollectionsToTrue() {
    if (this.isChanged) {
      this.store.dispatch(setRefreshCollectionsToTrue());
    }
  }
}
