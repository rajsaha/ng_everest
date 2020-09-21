import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { GeneralModule } from "../general/general.module";
import { CpiComponent } from "src/app/general/dialogs/cpi/cpi.component";
import { EditProfileComponent } from "src/app/pages/profile/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "src/app/pages/profile/change-password/change-password.component";
import { DeleteAccountComponent } from "src/app/pages/profile/delete-account/delete-account.component";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "src/app/pages/profile/profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PublicProfileComponent } from "src/app/pages/profile/public-profile/public-profile.component";
import { ViewCollectionComponent } from "src/app/pages/view-collection/view-collection.component";
import { ViewResourceComponent } from "src/app/pages/view-resource/view-resource.component";
import { ManageComponent } from "src/app/pages/manage/manage.component";

const routes: Routes = [
  {
    path: "settings",
    component: ProfileComponent
  },
  {
    path: "user/:username",
    children: [
      {
        path: "",
        component: ManageComponent,
        pathMatch: "full",
      },
      {
        path: "resource/:resourceId",
        component: ViewResourceComponent,
      },
      {
        path: "collection/:collectionId",
        component: ViewCollectionComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    PublicProfileComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    CpiComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  entryComponents: [CpiComponent],
})
export class ProfileModule {}
