import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(data: any) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: data.message,
      duration: 2000,
      panelClass: [data.class]
    });
  }
}
