import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AtcComponent } from "src/app/components/dialogs/atc/atc.component";
import { DcComponent } from "src/app/components/dialogs/dc/dc.component";
import { DrComponent } from "src/app/components/dialogs/dr/dr.component";
import { FfComponent } from "src/app/components/dialogs/ff/ff.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MiniCollectionComponent } from 'src/app/components/dialogs/atc/mini-collection/mini-collection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GeneralModule } from '../general/general.module';

@NgModule({
  declarations: [
    AtcComponent,
    DcComponent,
    DrComponent,
    FfComponent,
    MiniCollectionComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    GeneralModule,
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
    MatTabsModule,
  ],
  exports: [AtcComponent, DcComponent, DrComponent, FfComponent],
})
export class DialogsModule {}
