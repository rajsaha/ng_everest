import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
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
        loadChildren: () => import('src/app/modules/content/content.module').then(m => m.ContentModule)
      },
      {
        path: 'manage',
        loadChildren: () => import('src/app/modules/manage/manage.module').then(m => m.ManageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('src/app/modules/profile/profile.module').then(m => m.ProfileModule)
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
        path: '',
        loadChildren: () => import('src/app/modules/no-auth/no-auth.module').then(m => m.NoAuthModule)
      },
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
