import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from 'src/app/pages/feed/feed.component';
import { ShareResourceComponent } from 'src/app/pages/share-resource/share-resource.component';
import { SearchPageComponent } from 'src/app/pages/search-page/search-page.component';
import { PoComponent } from 'src/app/components/post/po/po.component';
import { AddToCollectionComponent } from 'src/app/components/add-to-collection/add-to-collection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GeneralModule } from '../general/general.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from 'src/app/components/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExploreComponent } from 'src/app/pages/explore/explore.component';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    pathMatch: "full"
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'share-resource',
    component: ShareResourceComponent,
  },
];

@NgModule({
  declarations: [
    FeedComponent,
    PoComponent,
    ShareResourceComponent,
    UserComponent,
    AddToCollectionComponent,
    SearchPageComponent,
    ExploreComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    GeneralModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    FeedComponent,
    ExploreComponent,
    PoComponent,
    ShareResourceComponent,
    UserComponent,
    AddToCollectionComponent,
    SearchPageComponent
  ]
})
export class ContentModule { }
