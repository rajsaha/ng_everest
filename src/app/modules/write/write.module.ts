import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WriteComponent } from 'src/app/pages/write/write.component';
import { EditorModule } from '@tinymce/tinymce-angular';

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
    EditorModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WriteModule { }
