import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { CollectionService } from '@services/collection/collection.service';

@Component({
  selector: 'app-delete-resource-from-collection',
  templateUrl: './delete-resource-from-collection.component.html',
  styleUrls: ['./delete-resource-from-collection.component.scss']
})
export class DeleteResourceFromCollectionComponent implements OnInit {
  @Input() data: any;
  @Input() collectionId: any;
  isActive = false;
  @Output() deleteEvent = new EventEmitter();
  // Icons
  faTimesCircle = faTimesCircle;
  constructor(private collectionService: CollectionService) { }

  ngOnInit() {}

  toggleActive(status: boolean) {
    this.isActive = status;
  }

  async deleteResourceFromCollection() {
    const result: any = await this.collectionService.deleteResourceFromCollection({
      collectionId: this.collectionId,
      resourceId: this.data._id,
    });

    if (!result.error) {
      this.deleteEvent.emit({
        isDeleted: true,
        resource: this.data
      });
    }
  }
}
