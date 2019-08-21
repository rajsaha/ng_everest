import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from 'src/app/components/custom-button/custom-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from 'src/app/pipes/truncate';
import { SnackbarComponent } from 'src/app/general/snackbar/snackbar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

@NgModule({
  declarations: [CustomButtonComponent, TruncatePipe, SnackbarComponent, LoadingComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    InfiniteScrollModule
  ],
  exports: [
    CustomButtonComponent,
    FontAwesomeModule,
    TruncatePipe,
    SnackbarComponent,
    InfiniteScrollModule,
    LoadingComponent
  ]
})
export class GeneralModule { }
