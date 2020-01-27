import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '@services/collection/collection.service';
import { ResourceService } from '@services/resource/resource.service';
import { faPen, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from '@services/general/utility.service';
import { MatDialog } from '@angular/material/dialog';
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
  currentUser: string;
  @Output() dcResponse: EventEmitter<any> = new EventEmitter();
  changeCollectionForm: FormGroup;
  numOfResources: number;
  size = 5;
  pointer = 0;

  // Icons
  faPen = faPen;
  faEdit = faEdit;

  // Toggles
  isLoading = false;
  isMine = false;
  isInCollectionPage = true;
  seeMore = false;

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private resourceService: ResourceService,
    private utilityService: UtilityService,
    public dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('username');
    this.initCollectionForm();
    this.onCollectionTitleFormChange();
    this.onCollectionDescriptionFormChange();
    this.route.params.subscribe(async (params) => {
      this.collection = null;
      this.id = params.collectionId;
      await Promise.all([
        this.getCollection(),
        this.checkIfMine(this.currentUser, this.id)
      ]);
    });
  }

  async getCollection() {
    this.isLoading = true;
    const result: any = await this.collectionService.getCollectionById({ id: this.id });
    this.collection = result.collection;
    this.numOfResources = this.collection.resources.length;
    this.changeCollectionForm.controls.title.patchValue(result.collection.title);
    this.changeCollectionForm.controls.description.patchValue(result.collection.description);
    if (this.numOfResources > 0) {
      await this.getMultipleResources(this.collection.resources);
    }
    this.isLoading = false;
  }

  async getMultipleResources(data) {
    const lastIndex = this.numOfResources - 1;
    if (lastIndex >= this.size) {
      this.seeMore = true;
      const page = data.slice(this.pointer, (this.pointer + this.size));
      this.pointer += 5;
      if (this.pointer > lastIndex) {
        this.seeMore = false;
      }
      const result: any = await this.resourceService.getMultipleResources(page);
      for (let resource of result.resources) {
        this.resources.push(resource);
      }
    } else {
      this.seeMore = false;
      const result: any = await this.resourceService.getMultipleResources(data);
      for (let resource of result.resources) {
        this.resources.push(resource);
      }
    }
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

  initCollectionForm() {
    this.changeCollectionForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  onCollectionTitleFormChange() {
    this.changeCollectionForm.get('title').valueChanges.pipe(delay(1500)).subscribe(async (title) => {
      const result = await this.collectionService.changeCollectionTitle({id: this.collection._id, title});
    });
  }

  onCollectionDescriptionFormChange() {
    this.changeCollectionForm.get('description').valueChanges.pipe(delay(1500)).subscribe(async (description) => {
      const result = await this.collectionService.changeCollectionDescription({id: this.collection._id, description});
    });
  }

  async checkIfMine(username: string, id: string) {
    const response: any = await this.collectionService.checkIfMine({ username, id});
    this.isMine = response;
  }
}
