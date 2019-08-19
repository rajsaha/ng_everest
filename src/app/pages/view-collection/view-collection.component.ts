import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '@services/collection/collection.service';
import { ResourceService } from '@services/resource/resource.service';
import { faPen, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from '@services/general/utility.service';
import { MatDialog } from '@angular/material';
import { DcComponent } from 'src/app/general/dialogs/dc/dc.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { delay } from 'rxjs/internal/operators';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.scss']
})
export class ViewCollectionComponent implements OnInit {
  id: string;
  collection: any;
  resources = [];
  @Output() dcResponse: EventEmitter<any> = new EventEmitter();
  changeCollectionTitleForm: FormGroup;

  // Icons
  faPen = faPen;
  faEdit = faEdit;

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private resourceService: ResourceService,
    private utilityService: UtilityService,
    public dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initCollectionTitleForm();
    this.onCollectionTitleFormChange();
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getCollection(this.id);
    });
  }

  async getCollection(id: string) {
    const result = await this.collectionService.getCollectionById({ id });
    this.collection = result.collection;
    this.changeCollectionTitleForm.controls.title.patchValue(result.collection.title);
    if (this.collection.resources.length > 0) {
      await this.getMultipleResources(this.collection.resources);
    }
  }

  async getMultipleResources(data) {
    const result = await this.resourceService.getMultipleResources(data);
    this.resources = result.resources;
  }

  drResponseHandler(result: string) {
    for (const { item, index } of this.utilityService.toItemIndexes(this.resources)) {
      if (result === item._id) {
        this.resources.splice(index, 1);
        return;
      }
    }
  }

  openDcDialog() {
    const dialogRef = this.dialog.open(DcComponent, {
      data: {
        id: this.id,
        title: this.collection.title
      }
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.dcResponse.emit();
    });
  }

  initCollectionTitleForm() {
    this.changeCollectionTitleForm = this.fb.group({
      title: ['']
    });
  }

  onCollectionTitleFormChange() {
    this.changeCollectionTitleForm.get('title').valueChanges.pipe(delay(1500)).subscribe(async (title) => {
      const result = await this.collectionService.changeCollectionTitle({id: this.collection._id, title});
      console.log(result);
    });
  }
}
