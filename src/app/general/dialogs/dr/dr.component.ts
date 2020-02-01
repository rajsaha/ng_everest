import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceService } from '@services/resource/resource.service';
import { SnackbarService } from '@services/general/snackbar.service';

@Component({
  selector: 'app-dr',
  templateUrl: './dr.component.html',
  styleUrls: ['./dr.component.scss']
})
export class DrComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DrComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private resourceService: ResourceService,
    private snackbarService: SnackbarService) { }

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }

  async onYesClick() {
    const response: any = await this.resourceService.deleteResource({id: this.data.id});
    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Resource deleted!',
          error: false
        },
        class: 'green-snackbar',
      });
      this.dialogRef.close(true);
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Something went wrong!`,
          error: true
        },
        class: 'red-snackbar',
      });

      this.dialogRef.close(false);
    }
  }

}
