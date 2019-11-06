import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtcComponent } from 'src/app/general/dialogs/atc/atc.component';
import { DcComponent } from 'src/app/general/dialogs/dc/dc.component';
import { DrComponent } from 'src/app/general/dialogs/dr/dr.component';
import { FfComponent } from 'src/app/general/dialogs/ff/ff.component';
import {
  MatFormFieldModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatRippleModule,
  MatProgressBarModule,
  MatTabsModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [AtcComponent, DcComponent, DrComponent, FfComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  exports: [AtcComponent, DcComponent, DrComponent, FfComponent],
  entryComponents: [FfComponent]
})
export class DialogsModule {}
