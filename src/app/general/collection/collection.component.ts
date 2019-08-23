import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '@services/resource/resource.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  @Input() data: any;
  image1 = '';
  image2 = '';
  image3 = '';
  image4 = '';

  constructor(
    private resourceService: ResourceService,
    private route: Router,
    private router: ActivatedRoute) { }

  async ngOnInit() {
    await this.getFourImages();
  }

  async getFourImages() {
    const result = await this.resourceService.getFourImages([...this.data.resources]);
    if (result.images[0]) {
      this.image1 = result.images[0].image;
    }

    if (result.images[1]) {
      this.image2 = result.images[1].image;
    }

    if (result.images[2]) {
      this.image3 = result.images[2].image;
    }

    if (result.images[3]) {
      this.image4 = result.images[3].image;
    }
  }

  goToCollection() {
    this.route.navigate([`/profile/${this.data.username}/collection/${this.data._id}`], { relativeTo: this.router.parent });
  }
}
