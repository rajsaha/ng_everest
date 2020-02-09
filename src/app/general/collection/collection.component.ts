import { Component, OnInit, Input } from "@angular/core";
import { ResourceService } from "@services/resource/resource.service";
import { Router, ActivatedRoute } from "@angular/router";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { PopoverService } from "@services/popover/popover.service";
import { CollectionOptionsComponent } from "./collection-options/collection-options.component";

@Component({
  selector: "app-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.scss"]
})
export class CollectionComponent implements OnInit {
  @Input() data: any;
  image1 = "";
  image2 = "";
  image3 = "";
  image4 = "";

  // Toggles
  isLoading = false;

  // Icons
  faEllipsesV = faEllipsisV;

  constructor(
    private resourceService: ResourceService,
    private route: Router,
    private router: ActivatedRoute,
    private popper: PopoverService
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    await this.getFourImages();
    this.isLoading = false;
  }

  async getFourImages() {
    let resourceIds = [];
    for (let resource of this.data.resources) {
      resourceIds.push(resource.resourceId);
    }
    const result: any = await this.resourceService.getFourImages(resourceIds);
    if (result.images[0]) {
      this.image1 = result.images[0].mdImage.link;
    }

    if (result.images[1]) {
      this.image2 = result.images[1].mdImage.link;
    }

    if (result.images[2]) {
      this.image3 = result.images[2].mdImage.link;
    }

    if (result.images[3]) {
      this.image4 = result.images[3].mdImage.link;
    }
  }

  goToCollection() {
    this.route.navigate(
      [`/profile/user/${this.data.username}/collection/${this.data._id}`],
      { relativeTo: this.router.parent }
    );
  }

  show(origin: HTMLElement) {
    const ref = this.popper.open<{}>({
      content: CollectionOptionsComponent,
      origin,
      data: {}
    });

    ref.afterClosed$.subscribe(res => {
      if (res.data && res.data["isDeleted"]) {
      }
    });
  }
}
