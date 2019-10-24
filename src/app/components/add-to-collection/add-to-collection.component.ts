import { Component, OnInit, Input } from '@angular/core';
import { CollectionService } from '@services/collection/collection.service';

@Component({
  selector: 'app-add-to-collection',
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.scss']
})
export class AddToCollectionComponent implements OnInit {
  @Input() resourceId: string;

  username: string;
  collections = [];
  currentCollectionName = '';

  // Pagination
  pageNo = 1;
  size = 5;

  // Toggles
  constructor(private collectionService: CollectionService) {}

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    await this.getCollectionNames();
    if (this.resourceId) {
      await this.getCollectionTitle(this.resourceId);
    }
  }

  async getCollectionNames() {
    const response = await this.collectionService.getCollectionNames({
      pageNo: this.pageNo,
      size: this.size,
      username: this.username
    });

    if (response.collections) {
      for (const collection of response.collections) {
        this.collections.push(collection);
      }
    }
  }

  async getCollectionTitle(resourceId: string) {
    const collection = await this.collectionService.getCollectionTitleByResourceId(
      { username: this.username, resourceId }
    );

    if (collection.collection) {
      this.currentCollectionName = collection.collection.title;
    }
  }
}
