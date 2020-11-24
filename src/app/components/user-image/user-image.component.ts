import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-image",
  templateUrl: "./user-image.component.html",
  styleUrls: ["./user-image.component.scss"],
})
export class UserImageComponent implements OnInit {
  @Input() size: string;
  @Input() userData: any;
  @Input() clickable = true;
  @Input() hoverable = true;
  imageSizeClass: string;
  url = {};
  clickableClass = "";
  placeholder: string;
  ready = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.userData.image) {
      this.url = { "background-image": "none" };
    } else {
      this.url = { "background-image": `url(${this.userData.image})` };
    }

    // * Set image container size
    switch (this.size) {
      case "xxs":
        this.imageSizeClass = "xxs";
        break;
      case "xs":
        this.imageSizeClass = "xs";
        break;
      case "sm":
        this.imageSizeClass = "sm";
        break;
      case "md":
        this.imageSizeClass = "md";
        break;
      case "lg":
        this.imageSizeClass = "lg";
        break;
      default:
        this.imageSizeClass = "sm";
        break;
    }

    // * Set clickable
    if (this.clickable || this.hoverable) {
      this.clickableClass = "clickable";
    }

    // * Set placeholder
    let firstLetter = this.userData.firstName.charAt(0);
    let secondLetter = this.userData.lastName.charAt(0);
    this.placeholder = firstLetter.concat(secondLetter).toUpperCase();
    this.ready = true;
  }

  goToUser(username: string) {
    if (this.clickable) {
      this.router.navigate([`/profile/user/${username}`], {
        relativeTo: this.route.parent,
      });
    }
  }
}
