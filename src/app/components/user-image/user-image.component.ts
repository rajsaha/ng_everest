import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-user-image",
  templateUrl: "./user-image.component.html",
  styleUrls: ["./user-image.component.scss"]
})
export class UserImageComponent implements OnInit {
  @Input() size: string;
  @Input() image: any;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() username: string;
  @Input() clickable = true;
  imageSizeClass: string;
  url = {};
  clickableClass = "";
  placeholder: string;
  ready = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    if (!this.image) {
      this.url = { 'background-image': 'none'};
    } else {
      this.url = { 'background-image': `url(${this.image})` };
    }
    
    // * Set image container size
    switch (this.size) {
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
    if (this.clickable) {
      this.clickableClass = 'clickable';
    }

    // * Set placeholder
    let firstLetter = this.firstName.charAt(0);
    let secondLetter = this.lastName.charAt(0);
    this.placeholder = firstLetter.concat(secondLetter).toUpperCase();
    this.ready = true;
  }

  goToUser(username: string) {
    if (!this.clickable) {
      return;
    }
    this.router.navigate([`/profile/user/${username}`], {
      relativeTo: this.route.parent
    });
  }
}
