import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from 'src/app/components/custom-button/custom-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from 'src/app/pipes/truncate';
import { SnackbarComponent } from 'src/app/general/snackbar/snackbar.component';



@NgModule({
  declarations: [CustomButtonComponent, TruncatePipe, SnackbarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CustomButtonComponent,
    FontAwesomeModule,
    TruncatePipe,
    SnackbarComponent
  ]
})
export class GeneralModule { }
