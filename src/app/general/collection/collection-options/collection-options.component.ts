import { Component, OnInit } from "@angular/core";
import { PopoverRef } from "src/app/components/popover/popover-ref";
import { ActivatedRoute, Router } from "@angular/router";
import { faPlusCircle, faEdit, faShare, faShareAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-collection-options",
  templateUrl: "./collection-options.component.html",
  styleUrls: ["./collection-options.component.scss"]
})
export class CollectionOptionsComponent implements OnInit {
  // Icons
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faShare = faShare;
  faShareAlt = faShareAlt;

  constructor(
    private popoverRef: PopoverRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}
}
