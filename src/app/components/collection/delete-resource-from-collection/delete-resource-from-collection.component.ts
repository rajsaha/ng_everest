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
  @Output() deleteEvent = new EventEmitter();
  isActive = false;
  isLoading = false;
  // Icons
  faTimesCircle = faTimesCircle;
  constructor(private collectionService: CollectionService) { }

  ngOnInit() {}

  toggleActive(status: boolean) {
    this.isActive = status;
  }

  async deleteResourceFromCollection() {
    this.isLoading = true;
    const result: any = await this.collectionService.deleteResourceFromCollection({
      collectionId: this.collectionId,
      resourceId: this.data._id,
    });
    this.isLoading = false;
    if (!result.error) {
      this.deleteEvent.emit({
        isDeleted: true,
        resource: this.data
      });
    }
  }

  generatePlaceholderText(title: string) {
    let stringArray = title.split(" ");
    let output = "";
    if (stringArray.length > 1) {
      output = stringArray[0].charAt(0) + stringArray[1].charAt(0);
    } else {
      output = stringArray[0].charAt(0) + stringArray[0].charAt(1);
    }

    return output;
  }
}
