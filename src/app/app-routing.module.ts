import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FeedComponent } from './pages/feed/feed.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShareResourceComponent } from './pages/share-resource/share-resource.component';
import { MainComponent } from './layouts/main/main.component';
import { NoAuthComponent } from './layouts/no-auth/no-auth.component';

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
        path: 'share-resource',
        component: ShareResourceComponent,
      },
      {
        path: 'manage',
        loadChildren: 'src/app/modules/manage/manage.module#ManageModule'
      },
      {
        path: 'profile',
        loadChildren: 'src/app/modules/profile/profile.module#ProfileModule'
      },
      {
        path: 'write',
        loadChildren: 'src/app/modules/write/write.module#WriteModule'
      }
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
    redirectTo: '404',
    pathMatch: 'full'
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
