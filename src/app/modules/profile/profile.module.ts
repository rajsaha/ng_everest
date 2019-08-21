import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { GeneralModule } from '../general/general.module';
import { CpiComponent } from 'src/app/general/dialogs/cpi/cpi.component';
import { EditProfileComponent } from 'src/app/pages/profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from 'src/app/pages/profile/change-password/change-password.component';
import { DeleteAccountComponent } from 'src/app/pages/profile/delete-account/delete-account.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
      path: '',
      component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    CpiComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  entryComponents: [CpiComponent]
})
export class ProfileModule { }
