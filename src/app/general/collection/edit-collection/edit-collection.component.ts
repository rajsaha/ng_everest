import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CollectionService } from "@services/collection/collection.service";

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

  constructor(
    public dialogRef: MatDialogRef<EditCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private collectionService: CollectionService
  ) {}

  async ngOnInit() {
    console.log(this.data.collectionData);
    this.initForm();
    this.setData();
    await this.getCollection();
  }

  initForm() {
    this.form = this.fb.group({
      title: [""],
      description: [""],
    });
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
    for (let item of result.collection.collection[0].resources) {
      this.resources.push(item);
    }
    this.isLoading = false;
  }

  cancel() {
    this.dialogRef.close();
  }
}
