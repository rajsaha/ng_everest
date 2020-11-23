import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageComponent } from "../../pages/manage/manage.component";
import { ManageResourcesComponent } from "../../pages/manage/manage-resources/manage-resources.component";
import { ManageCollectionsComponent } from "../../pages/manage/manage-collections/manage-collections.component";
import { EditResourceComponent } from "../../pages/edit-resource/edit-resource.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/modules/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { GeneralModule } from "src/app/modules/general/general.module";
import { DialogsModule } from "src/app/modules/dialogs/dialogs.module";
import { AutosizeModule } from "ngx-autosize";
import { ResourceOptionsComponent } from 'src/app/components/resource/resource-options/resource-options.component';
import { CollectionOptionsComponent } from 'src/app/components/collection/collection-options/collection-options.component';
import { FilterOptionsComponent } from 'src/app/pages/manage/filter-options/filter-options.component';
import { ProfileSummaryComponent } from 'src/app/components/profile-summary/profile-summary.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { EditCollectionComponent } from 'src/app/components/collection/edit-collection/edit-collection.component';
import { DeleteResourceFromCollectionComponent } from 'src/app/components/collection/delete-resource-from-collection/delete-resource-from-collection.component';

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent
  },
  {
    path: "resource",
    component: ManageResourcesComponent
  },
  {
    path: "resource/edit/:resourceId",
    component: EditResourceComponent
  },
  {
    path: "collection",
    component: ManageCollectionsComponent
  }
];

@NgModule({
  declarations: [
    ManageComponent,
    ManageResourcesComponent,
    EditResourceComponent,
    ManageCollectionsComponent,
    ProfileSummaryComponent,
    ResourceOptionsComponent,
    CollectionOptionsComponent,
    FilterOptionsComponent,
    EditCollectionComponent,
    DeleteResourceFromCollectionComponent
  ],
  imports: [
    CommonModule,
    AutosizeModule,
    MaterialModule,
    ReactiveFormsModule,
    GeneralModule,
    DialogsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManageModule {}
