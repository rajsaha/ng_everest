import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from 'src/app/components/custom-button/custom-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from 'src/app/pipes/truncate';
import { SnackbarComponent } from 'src/app/general/snackbar/snackbar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ResourceComponent } from 'src/app/general/resource/resource.component';
import { CollectionComponent } from 'src/app/general/collection/collection.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    CustomButtonComponent,
    TruncatePipe,
    SnackbarComponent,
    LoadingComponent,
    ResourceComponent,
    CollectionComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [
    CustomButtonComponent,
    FontAwesomeModule,
    TruncatePipe,
    SnackbarComponent,
    InfiniteScrollModule,
    RouterModule,
    LoadingComponent,
    ResourceComponent,
    CollectionComponent
  ]
})
export class GeneralModule { }
