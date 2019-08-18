import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule,
  MatBadgeModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatDividerModule,
  MatRippleModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // * Angular Material Modules
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatRippleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    // ! End of Material Angular Modules
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatRippleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
  ]
})
export class MaterialModule { }
