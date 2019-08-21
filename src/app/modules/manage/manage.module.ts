import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from '../../pages/manage/manage.component';
import { ManageResourcesComponent } from '../../pages/manage/manage-resources/manage-resources.component';
import { ManageCollectionsComponent } from '../../pages/manage/manage-collections/manage-collections.component';
import { ViewCollectionComponent } from '../../pages/view-collection/view-collection.component';
import { EditResourceComponent } from '../../pages/edit-resource/edit-resource.component';
import { AtcComponent } from 'src/app/general/dialogs/atc/atc.component';
import { SnackbarComponent } from 'src/app/general/snackbar/snackbar.component';
import { DrComponent } from 'src/app/general/dialogs/dr/dr.component';
import { DcComponent } from 'src/app/general/dialogs/dc/dc.component';
import { CommonModule } from '@angular/common';
import { ResourceComponent } from 'src/app/general/resource/resource.component';
import { CollectionComponent } from 'src/app/general/collection/collection.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralModule } from 'src/app/modules/general/general.module';
import { DialogsModule } from 'src/app/modules/dialogs/dialogs.module';

const routes: Routes = [
    {
        path: '',
        component: ManageComponent
    },
    {
        path: 'resource',
        component: ManageResourcesComponent,
    },
    {
        path: 'resource/:id',
        component: EditResourceComponent
    },
    {
        path: 'collection',
        component: ManageCollectionsComponent
    },
    {
        path: 'collection/:id',
        component: ViewCollectionComponent,
    }
];

@NgModule({
    declarations: [
        ManageComponent,
        ManageResourcesComponent,
        EditResourceComponent,
        ManageCollectionsComponent,
        ViewCollectionComponent,
        ResourceComponent,
        CollectionComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        GeneralModule,
        DialogsModule,
        RouterModule.forChild(routes)
    ],
    entryComponents: [AtcComponent, SnackbarComponent, DrComponent, DcComponent],
    exports: [RouterModule]
})

export class ManageModule {}
