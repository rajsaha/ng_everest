import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteComponent } from 'src/app/pages/write/write.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GeneralModule } from '../general/general.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AutosizeModule } from 'ngx-autosize';

const routes: Routes = [
  {
      path: '',
      component: WriteComponent
  }
];

@NgModule({
  declarations: [
    WriteComponent
  ],
  imports: [
    CommonModule,
    AutosizeModule,
    MaterialModule,
    GeneralModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WriteModule { }
