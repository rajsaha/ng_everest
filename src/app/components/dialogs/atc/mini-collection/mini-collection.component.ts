import { Component, OnInit, Input } from '@angular/core';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { CollectionService } from '@services/collection/collection.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { ResourceService } from '@services/resource/resource.service';

@Component({
  selector: 'app-mini-collection',
  templateUrl: './mini-collection.component.html',
  styleUrls: ['./mini-collection.component.scss']
})
export class MiniCollectionComponent implements OnInit {
  @Input() data: any;
  @Input() userId: string;
  currentCollectionId: string;
  @Input() resourceId: string;
  @Input() clickable = true;

  showPlaceholder = false;
  placeholderText = "";
  image: string;
  inThisCollection = false;

  // Icons
  faCheckCircle = faCheckCircle;

  constructor(private resourceService: ResourceService, private snackbarService: SnackbarService, private collectionService: CollectionService) { }

  ngOnInit() {
    this.setImage();
    this.inThisCollection = this.data.inThisCollection.length > 0 ? true : false;
  }

  setImage() {
    if (!this.data.resource1) {
      this.showPlaceholder = true;
      this.placeholderText = this.generatePlaceholderText(this.data.title);
    } else {
      this.image = this.data.resource1.smImage.link;

      // * Handle no image situation
      if (this.data.resource1.noImage) {
        this.showPlaceholder = true;
        this.placeholderText = this.generatePlaceholderText(this.data.resource1.title);
      }
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

  async toggleResourceFromCollection() {
    switch (this.inThisCollection) {
      case true:
        await this.deleteResourceFromCollection();
        break;
      case false:
        await this.addResourceToCollection();
        break;
      default:
        break;
    }
  }

  async addResourceToCollection() {
    this.inThisCollection = true;
    let collectionId = this.data._id;
    const response: any = await this.resourceService.addResourceToCollection({
      collectionId,
      resourceId: this.resourceId,
      username: this.data.username,
      userId: this.userId
    });

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Resource added to collection',
          error: false,
        },
        class: "green-snackbar",
      });
      this.inThisCollection = true;
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Something went wrong!',
          error: true,
        },
        class: "red-snackbar",
      });
      this.inThisCollection = false;
    }
  }

  async deleteResourceFromCollection() {
    this.inThisCollection = false;
    const result: any = await this.collectionService.deleteResourceFromCollection({
      collectionId: this.data._id,
      resourceId: this.resourceId,
    });

    if (!result.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Resource removed from collection',
          error: false,
        },
        class: "green-snackbar",
      });
      this.inThisCollection = false;
    } else {
      this.inThisCollection = true;
    }
  }
}
