import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-user-image",
  templateUrl: "./user-image.component.html",
  styleUrls: ["./user-image.component.scss"]
})
export class UserImageComponent implements OnInit {
  @Input() size: string;
  @Input() data: any;
  imageSize = "smImage";
  constructor() {
    switch (this.size) {
      case "xs":
        this.imageSize = "xsImage";
        break;
      case "sm":
        this.imageSize = "smImage";
        break;
      case "md":
        this.imageSize = "mdImage";
        break;
      case "lg":
        this.imageSize = "lgImage";
        break;
      default:
        this.imageSize = "smImage";
        break;
    }
  }

  ngOnInit() {}
}
