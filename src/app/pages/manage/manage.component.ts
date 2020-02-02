import { Component, OnInit } from "@angular/core";
import {
  faSearch,
  faFilter,
  faLayerGroup,
  faPager,
  faThList,
  faThLarge
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"]
})
export class ManageComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  // Icons
  faSearch = faSearch;
  faFilter = faFilter;
  faLayerGroup = faLayerGroup;
  faPager = faPager;
  faThList = faThList;
  faThLarge = faThLarge;

  constructor() {}

  ngOnInit() {}
}
