import { Component, OnInit, Input } from "@angular/core";
import { ResourceService } from "@services/resource/resource.service";
import { Router, ActivatedRoute } from "@angular/router";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { PopoverService } from "@services/popover/popover.service";
import { CollectionOptionsComponent } from "./collection-options/collection-options.component";
interface NoImageObj {
  noImage: boolean;
  topText: string;
  bottomText: string;
  backgroundColor: string;
  textColor: string;
}

@Component({
  selector: "app-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.scss"]
})

export class CollectionComponent implements OnInit {
  @Input() data: any;
  isLoading = false;
  image1 = "";
  resource1NoImageData: NoImageObj = {
    noImage: false,
    backgroundColor: "",
    textColor: "",
    topText: "",
    bottomText: ""
  };
  image2 = "";
  resource2NoImageData: NoImageObj = {
    noImage: false,
    backgroundColor: "",
    textColor: "",
    topText: "",
    bottomText: ""
  };
  image3 = "";
  resource3NoImageData: NoImageObj = {
    noImage: false,
    backgroundColor: "",
    textColor: "",
    topText: "",
    bottomText: ""
  };
  image4 = "";
  resource4NoImageData: NoImageObj = {
    noImage: false,
    backgroundColor: "",
    textColor: "",
    topText: "",
    bottomText: ""
  };
  truncateAmount = "17";

  // Icons
  faEllipsesV = faEllipsisV;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private popper: PopoverService
  ) {}

  ngOnInit() {
    this.setImages();
  }

  setImages() {
    this.isLoading = true;
    if (this.data.resource1) {
      this.image1 = this.data.resource1.lgImage.link;
      if (this.data.resource1.noImage) {
        let stringArray = this.data.resource1.title.split(" ");
        let halfLength = Math.ceil(stringArray.length / 2);
        this.resource1NoImageData.noImage = true;
        this.resource1NoImageData.topText = stringArray.splice(0, halfLength).join(" ");
        this.resource1NoImageData.bottomText = stringArray.join(" ");
        this.resource1NoImageData.backgroundColor = this.data.resource1.backgroundColor;
        this.resource1NoImageData.textColor = this.data.resource1.textColor;
      }
    }

    if (this.data.resource2) {
      this.image2 = this.data.resource2.mdImage.link;
      if (this.data.resource2.noImage) {
        let stringArray = this.data.resource2.title.split(" ");
        let halfLength = Math.ceil(stringArray.length / 2);
        this.resource2NoImageData.noImage = true;
        this.resource2NoImageData.topText = stringArray.splice(0, halfLength).join(" ");
        this.resource2NoImageData.bottomText = stringArray.join(" ");
        this.resource2NoImageData.backgroundColor = this.data.resource2.backgroundColor;
        this.resource2NoImageData.textColor = this.data.resource2.textColor;
      }
    }

    if (this.data.resource3) {
      this.image3 = this.data.resource3.mdImage.link;
      if (this.data.resource3.noImage) {
        let stringArray = this.data.resource3.title.split(" ");
        let halfLength = Math.ceil(stringArray.length / 2);
        this.resource3NoImageData.noImage = true;
        this.resource3NoImageData.topText = stringArray.splice(0, halfLength).join(" ");
        this.resource3NoImageData.bottomText = stringArray.join(" ");
        this.resource3NoImageData.backgroundColor = this.data.resource3.backgroundColor;
        this.resource3NoImageData.textColor = this.data.resource3.textColor;
      }
    }

    if (this.data.resource4) {
      this.image4 = this.data.resource4.mdImage.link;
      if (this.data.resource4.noImage) {
        let stringArray = this.data.resource4.title.split(" ");
        let halfLength = Math.ceil(stringArray.length / 2);
        this.resource4NoImageData.noImage = true;
        this.resource4NoImageData.topText = stringArray.splice(0, halfLength).join(" ");
        this.resource4NoImageData.bottomText = stringArray.join(" ");
        this.resource4NoImageData.backgroundColor = this.data.resource4.backgroundColor;
        this.resource4NoImageData.textColor = this.data.resource4.textColor;
      }
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
      data: {
        collectionData: this.data
      }
    });

    ref.afterClosed$.subscribe(res => {
      if (res.data && res.data["isDeleted"]) {
      }
    });
  }
}
