import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FeedComponent } from './pages/feed/feed.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShareResourceComponent } from './pages/share-resource/share-resource.component';
import { ManageResourcesComponent } from './pages/manage-resources/manage-resources.component';
import { ViewResourceComponent } from './pages/view-resource/view-resource.component';
import { EditResourceComponent } from './pages/edit-resource/edit-resource.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'share-resource',
    component: ShareResourceComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'manage-resources',
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: ManageResourcesComponent,
      },
      {
        path: 'edit/:id',
        component: EditResourceComponent
      },
      {
        path: 'view/:id',
        component: ViewResourceComponent
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '404'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
