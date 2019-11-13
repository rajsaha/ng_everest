import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
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
    this.onSearchFormChanges();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      query: [""]
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

  get query() {
    return this.searchForm.get("query").value;
  }

  onSearchFormChanges() {
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
    const searchResult: any = await this.userService.globalSearch(
      encodeURIComponent(query)
    );
    this.isLoading = false;

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
