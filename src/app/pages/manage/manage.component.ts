import { Component, OnInit, ViewChild } from "@angular/core";
import {
  faSearch,
  faFilter,
  faLayerGroup,
  faPager,
  faThList,
  faThLarge
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"]
})
export class ManageComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  form: FormGroup;
  isSearchFocused = false;

  // Icons
  faSearch = faSearch;
  faFilter = faFilter;
  faLayerGroup = faLayerGroup;
  faPager = faPager;
  faThList = faThList;
  faThLarge = faThLarge;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      searchQuery: [""],
      filter: [""],
      collections: [true],
      posts: [false],
      view: [true]
    });
  }

  viewCollections() {
    this.form.get("collections").patchValue(true);
    this.form.get("posts").patchValue(false);
  }

  viewPosts() {
    this.form.get("collections").patchValue(false);
    this.form.get("posts").patchValue(true);
  }

  searchFocusIn() {
    this.isSearchFocused = true;
  }

  searchFocusOut() {
    this.isSearchFocused = false;
  }
}
