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
  isLoading = false;
  image1 = "";
  image2 = "";
  image3 = "";
  image4 = "";

  // Icons
  faEllipsesV = faEllipsisV;

  constructor(
    private resourceService: ResourceService,
    private route: Router,
    private router: ActivatedRoute,
    private popper: PopoverService
  ) {}

  async ngOnInit() {
    this.setImages();
  }

  setImages() {
    this.isLoading = true;
    if (this.data.resource1) {
      this.image1 = this.data.resource1.lgImage.link;
    }

    if (this.data.resource2) {
      this.image2 = this.data.resource2.mdImage.link;
    }

    if (this.data.resource3) {
      this.image3 = this.data.resource3.mdImage.link;
    }

    if (this.data.resource4) {
      this.image4 = this.data.resource4.mdImage.link;
    }
    this.isLoading = false;
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
