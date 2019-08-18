import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '@services/collection/collection.service';
import { ResourceService } from '@services/resource/resource.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from '@services/general/utility.service';
import { MatDialog } from '@angular/material';
import { DcComponent } from 'src/app/general/dialogs/dc/dc.component';

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

  // Icons
  faPen = faPen;

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private resourceService: ResourceService,
    private utilityService: UtilityService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getCollection(this.id);
    });
  }

  async getCollection(id: string) {
    const result = await this.collectionService.getCollectionById({ id });
    this.collection = result.collection;
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
}
