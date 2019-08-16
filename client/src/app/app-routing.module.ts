import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FeedComponent } from './pages/feed/feed.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShareResourceComponent } from './pages/share-resource/share-resource.component';
import { ManageComponent } from './pages/manage/manage.component';
import { ViewResourceComponent } from './pages/view-resource/view-resource.component';
import { EditResourceComponent } from './pages/edit-resource/edit-resource.component';
import { ViewCollectionComponent } from './pages/view-collection/view-collection.component';
import { MainComponent } from './layouts/main/main.component';
import { NoAuthComponent } from './layouts/no-auth/no-auth.component';
import { ManageResourcesComponent } from './pages/manage/manage-resources/manage-resources.component';
import { ManageCollectionsComponent } from './pages/manage/manage-collections/manage-collections.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: FeedComponent,
      },
      {
        path: 'view/:id',
        component: ViewResourceComponent
      },
      {
        path: 'share-resource',
        component: ShareResourceComponent,
      },
      {
        path: 'manage',
        children: [
          {
            path: '',
            component: ManageComponent
          },
          {
            path: 'resource',
            component: ManageResourcesComponent,
            children: [
              {
                path: 'edit/:id',
                component: EditResourceComponent
              }
            ]
          },
          {
            path: 'collection/:id',
            component: ViewCollectionComponent
          }
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
  ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: NoAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
  ]
  },
  {
    path: '**',
    redirectTo: '404'
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
