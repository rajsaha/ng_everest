import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '@services/collection/collection.service';
import { ResourceService } from '@services/resource/resource.service';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.scss']
})
export class ViewCollectionComponent implements OnInit {
  id: string;
  collection: any;
  resources: any;

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private resourceService: ResourceService) { }

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
}
