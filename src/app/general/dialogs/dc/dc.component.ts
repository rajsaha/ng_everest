import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionService } from '@services/collection/collection.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { Router } from '@angular/router';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dc',
  templateUrl: './dc.component.html',
  styleUrls: ['./dc.component.scss']
})
export class DcComponent implements OnInit {
  // Icon
  faTrash = faTrash;
  
  constructor(
    public dialogRef: MatDialogRef<DcComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private collectionService: CollectionService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  async onYesClick() {
    const response: any = await this.collectionService.deleteCollection(this.data.id);

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Collection deleted!',
          error: false
        },
        class: 'green-snackbar',
      });
      this.dialogRef.close(this.data.id);
      this.router.navigate(['/manage']);
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Something went wrong!`,
          error: true
        },
        class: 'red-snackbar',
      });

      this.dialogRef.close();
    }
  }

}
