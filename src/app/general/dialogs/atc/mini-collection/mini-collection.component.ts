import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mini-collection',
  templateUrl: './mini-collection.component.html',
  styleUrls: ['./mini-collection.component.scss']
})
export class MiniCollectionComponent implements OnInit {
  @Input() data: any;
  currentCollectionId: string;
  @Input() resourceId: string;

  isInThisCollection = false;
  showPlaceholder = false;
  placeholderText = "";
  image: string;

  constructor() { }

  ngOnInit() {
    this.setImage();
    this.isInThisCollection = this.isResourceInThisCollection(this.data);
  }

  setImage() {
    if (!this.data.resource1) {
      this.showPlaceholder = true;
      this.placeholderText = this.generatePlaceholderText(this.data.title);
    } else {
      this.image = this.data.resource1.smImage.link;
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

  isResourceInThisCollection(collection: any) {
    if (collection.resource1) {
      if (collection.resource1._id === this.resourceId) {
        this.currentCollectionId = collection._id;

        return true;
      }
    }
    
    return false;
  }

}
