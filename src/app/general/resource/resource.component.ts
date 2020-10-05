import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faExternalLinkAlt,
  faTimes,
  faFolderMinus,
  faEllipsisV,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { Router, ActivatedRoute } from "@angular/router";
import { PopoverService } from '@services/popover/popover.service';
import { ResourceOptionsComponent } from './resource-options/resource-options.component';

@Component({
  selector: "app-resource",
  templateUrl: "./resource.component.html",
  styleUrls: ["./resource.component.scss"]
})
export class ResourceComponent implements OnInit {
  @Input() data: any;
  @Input() collectionId: string;
  @Output() deleteEvent = new EventEmitter();

  // Data
  id: string;
  url: string;
  title: string;
  tags = [];
  type: string;
  description: string;
  image = "";
  timestamp: any;
  allComments = [];
  resourceUser: string;
  recommended_by_count: number;
  noImage = false;
  backgroundColor: string;
  textColor: string;
  topText: string;
  bottomText: string;

  // For permissions
  loggedInUser: string;
  routeUser: string;

  // Icons
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faExternalLinkAlt = faExternalLinkAlt;
  faTimes = faTimes;
  faFolderMinus = faFolderMinus;
  faEllipsesV = faEllipsisV;
  faThumbsUp = faThumbsUp;

  // Toggles
  isLoading = false;
  isOptionsActive = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private popper: PopoverService
  ) {}

  ngOnInit() {
    this.loggedInUser = localStorage.getItem("username");
    this.getRouteUserId();
    this.populateResource();
  }

  getRouteUserId() {
    this.route.parent.params.subscribe(param => {
      this.routeUser = param.username;
    });
  }

  populateResource() {
    this.isLoading = true;
    this.id = this.data._id;
    if (this.data.username[0].username) {
      this.resourceUser = this.data.username[0].username;
    } else {
      this.resourceUser = this.data.username;
    }
    this.url = this.data.url;
    this.title = this.data.title;
    this.type = this.data.type;
    this.description = this.data.description;
    this.image = this.data.mdImage.link;
    this.timestamp = moment(this.data.timestamp.$date).fromNow();
    this.recommended_by_count = this.data.recommended_by_count;
    this.noImage = this.data.noImage;
    this.backgroundColor = this.data.backgroundColor;
    this.textColor = this.data.textColor;
    let stringArray = this.title.split(" ");
    let halfLength = Math.ceil(stringArray.length / 2);
    this.topText = stringArray.splice(0, halfLength).join(" ");
    this.bottomText = stringArray.join(" ");
    this.isLoading = false;
  }

  goToView() {
    this.router.navigate(
      [`/profile/user/${this.resourceUser}/resource/${this.id}`],
      { relativeTo: this.route.parent }
    );
  }

  show(origin: HTMLElement) {
    const ref = this.popper.open<{}>({
      content: ResourceOptionsComponent,
      origin,
      data: {
        resourceId: this.id,
        resourceUser: this.resourceUser,
        type: this.type,
        title: this.title
      }
    });

    ref.afterClosed$.subscribe(res => {
        if (res.data && res.data['isDeleted']) {
          this.deleteEvent.emit({
            resourceId: this.id
          });
        }
    })
  }
}
