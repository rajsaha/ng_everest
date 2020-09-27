import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosizeModule } from 'ngx-autosize';
import { CustomButtonComponent } from 'src/app/components/custom-button/custom-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from 'src/app/pipes/truncate';
import { SnackbarComponent } from 'src/app/general/snackbar/snackbar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ResourceComponent } from 'src/app/general/resource/resource.component';
import { CollectionComponent } from 'src/app/general/collection/collection.component';
import { ViewCollectionComponent } from 'src/app/pages/view-collection/view-collection.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewResourceComponent } from 'src/app/pages/view-resource/view-resource.component';
import { PostComponent } from 'src/app/general/post/post.component';
import { CommentComponent } from 'src/app/general/post/comment/comment.component';
import { UserImageComponent } from 'src/app/components/user-image/user-image.component';
import { ResourceNoImageComponent } from 'src/app/components/resource-no-image/resource-no-image.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    PostComponent,
    CommentComponent,
    CustomButtonComponent,
    TruncatePipe,
    SnackbarComponent,
    LoadingComponent,
    ResourceComponent,
    CollectionComponent,
    ViewCollectionComponent,
    ViewResourceComponent,
    UserImageComponent,
    ResourceNoImageComponent
  ],
  imports: [
    CommonModule,
    AutosizeModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  exports: [
    PostComponent,
    CustomButtonComponent,
    FontAwesomeModule,
    TruncatePipe,
    SnackbarComponent,
    InfiniteScrollModule,
    RouterModule,
    LoadingComponent,
    ResourceComponent,
    CollectionComponent,
    ViewCollectionComponent,
    ViewResourceComponent,
    UserImageComponent,
    ResourceNoImageComponent,
    ColorPickerModule
  ]
})
export class GeneralModule { }
