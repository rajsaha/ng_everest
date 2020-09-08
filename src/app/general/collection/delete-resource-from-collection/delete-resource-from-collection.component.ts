import { Component, OnInit, Input } from '@angular/core';
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
  // Icons
  faTimesCircle = faTimesCircle;
  constructor(private collectionService: CollectionService) { }

  ngOnInit() {
    console.log(this.data)
  }

  toggleActive(status: boolean) {
    this.isActive = status;
  }

  async deleteResourceFromCollection() {
    const result = await this.collectionService.deleteResourceFromCollection({
      anchorCollectionId: this.collectionId,
      resourceId: this.data._id,
    });

    console.log(result);
  }
}
