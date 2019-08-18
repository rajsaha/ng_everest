import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtcComponent } from 'src/app/general/dialogs/atc/atc.component';
import { DcComponent } from 'src/app/general/dialogs/dc/dc.component';
import { DrComponent } from 'src/app/general/dialogs/dr/dr.component';
import { MatFormFieldModule, MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AtcComponent,
    DcComponent,
    DrComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    AtcComponent,
    DcComponent,
    DrComponent
  ]
})
export class DialogsModule { }
