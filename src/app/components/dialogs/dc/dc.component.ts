import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CollectionService } from "@services/collection/collection.service";
import { SnackbarService } from "@services/general/snackbar.service";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { setRefreshCollectionsToTrue } from "@services/ngrx/refreshCollections/refreshCollections.actions";
import { Store } from '@ngrx/store';

@Component({
  selector: "app-dc",
  templateUrl: "./dc.component.html",
  styleUrls: ["./dc.component.scss"],
})
export class DcComponent implements OnInit {
  // Icon
  faTrash = faTrash;

  // Toggles
  isLoading = false;
  isDisabled = false;

  constructor(
    public dialogRef: MatDialogRef<DcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private collectionService: CollectionService,
    private snackbarService: SnackbarService,
    private store: Store<{ refreshCollectionsState: boolean }>
  ) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }

  async onYesClick() {
    this.isLoading = true;
    this.isDisabled = true;
    const response: any = await this.collectionService.deleteCollection({
      id: this.data.collectionData._id,
    });

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: "Collection deleted!",
          error: false,
        },
        class: "green-snackbar",
      });
      this.store.dispatch(setRefreshCollectionsToTrue());
      this.dialogRef.close();
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Something went wrong!`,
          error: true,
        },
        class: "red-snackbar",
      });

      this.dialogRef.close();
    }
  }
}
