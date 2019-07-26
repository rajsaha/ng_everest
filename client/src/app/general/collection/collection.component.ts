import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '@services/resource/resource.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  @Input() data: any;
  image1: string;
  image2: string;
  image3: string;
  image4: string;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.getFourImages();
  }

  async getFourImages() {
    const result = await this.resourceService.getFourImages([...this.data.resources]);
    if (result.images[0]) {
      this.image1 = result.images[0].image;
    }

    if (result.images[1]) {
      this.image1 = result.images[1].image;
    }

    if (result.images[2]) {
      this.image1 = result.images[2].image;
    }

    if (result.images[3]) {
      this.image1 = result.images[3].image;
    }
  }
}
