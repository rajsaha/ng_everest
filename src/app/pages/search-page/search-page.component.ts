import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { debounceTime } from "rxjs/internal/operators";
import { UserService } from "@services/user/user.service";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"]
})
export class SearchPageComponent implements OnInit {
  searchQuery: string;
  // Form
  searchForm: FormGroup;

  // Data
  users = [];
  resources = [];
  collections = [];

  // Icons
  faSearch = faSearch;

  // Toggles
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initSearchForm();
    this.getSearchQuery();
    this.onQueryChanges();
    this.onSearchFormChange();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      query: ["", Validators.required],
      orderBy: ["recent"],
      user: [true],
      resource: [true],
      collection: [true]
    });
  }

  getSearchQuery() {
    this.route.queryParams.subscribe(async param => {
      this.searchForm.get("query").patchValue(param.query);
      if (param.query) {
        await this.globalSearch(param.query);
      }
    });
  }

  onSearchFormChange() {
    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe(async val => {
      this.clearArrays();
      await this.globalSearch(val.query);
    });
  }

  get query() {
    return this.searchForm.get("query").value;
  }

  onQueryChanges() {
    this.searchForm
      .get("query")
      .valueChanges.pipe(debounceTime(300))
      .subscribe(async query => {
        if (query) {
          this.clearArrays();
          await this.globalSearch(query);
        } else {
          this.clearArrays();
        }
      });
  }

  clearArrays() {
    this.users = [];
    this.resources = [];
    this.collections = [];
  }

  async globalSearch(query: string) {
    this.isLoading = true;
    const searchResult: any = await this.userService.globalSearch({
      query: encodeURIComponent(query),
      options: {
        orderBy: this.searchForm.get('orderBy').value,
        resource: this.searchForm.get('resource').value,
        collection: this.searchForm.get('collection').value,
        user: this.searchForm.get('user').value
      }
    });
    console.log(searchResult);
    this.isLoading = false;

    if (searchResult.resourceOnly) {
      if (searchResult.resources && searchResult.resources.length > 0) {
        this.resources = searchResult.resources;
        return;
      }
    }

    // * Users
    if (searchResult.users && searchResult.users.users.length > 0) {
      this.users = searchResult.users.users;
    }

    // * Resources
    if (searchResult.resources && searchResult.resources.resources.length > 0) {
      this.resources = searchResult.resources.resources;
    }

    // * Collections
    if (
      searchResult.collections &&
      searchResult.collections.collections.length > 0
    ) {
      this.collections = searchResult.collections.collections;
    }
  }
}
