import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WriteComponent } from 'src/app/pages/write/write.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
    CKEditorModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WriteModule { }
