import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { debounceTime } from "rxjs/internal/operators";
import { UserService } from "@services/user/user.service";
import { faBorderAll, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Router, ActivatedRoute } from "@angular/router";
import { ResourceService } from "@services/resource/resource.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  // Icons
  faBorderAll = faBorderAll;
  faTimesCircle = faTimesCircle;

  // Form
  searchForm: FormGroup;

  // Toggles
  isSearchActive = false;
  isLoading = false;

  // Search data
  users = [];
  resources = [];
  collections = [];

  constructor(
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private userService: UserService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initSearchForm();
    this.onSearchFormChanges();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      query: [""]
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
        this.clearArrays();
        if (query) {
          this.isSearchActive = false;
          this.isLoading = true;
          const searchResult: any = await this.userService.globalSearch({
            query: encodeURIComponent(query),
            options: {
              orderBy: 'recent',
              resource: true,
              collection: true,
              user: true
            }
          });
          this.isSearchActive = true;
          this.isLoading = false;

          if (
            searchResult.resourceOnly &&
            searchResult.resources &&
            searchResult.resources.length > 0
          ) {
            this.resources = searchResult.resources;
            return;
          }          

          if (searchResult.users && searchResult.users.users.length > 0) {
            this.users = searchResult.users.users;
          }

          if (
            searchResult.resources &&
            searchResult.resources.resources.length > 0
          ) {
            this.resources = searchResult.resources.resources;
          }

          if (
            searchResult.collections &&
            searchResult.collections.collections.length > 0
          ) {
            this.collections = searchResult.collections.collections;
          }
        }
      });
  }

  async activateSearch() {
    this.clearArrays();
    if (this.searchForm.get("query").value) {
      const query = encodeURIComponent(this.searchForm.get("query").value);
      this.isSearchActive = false;
      this.isLoading = true;
      const searchResult: any = await this.userService.globalSearch({
        query,
        options: {
          orderBy: 'recent',
          resource: true,
          collection: true,
          user: true
        }
      });
      this.isSearchActive = true;
      this.isLoading = false;

      if (
        searchResult.resourceOnly &&
        searchResult.resources &&
        searchResult.resources.length > 0
      ) {
        this.resources = searchResult.resources;
        return;
      }

      if (searchResult.users && searchResult.users.users.length > 0) {
        this.users = searchResult.users.users;
      }

      if (
        searchResult.resources &&
        searchResult.resources.resources.length > 0
      ) {
        this.resources = searchResult.resources.resources;
      }

      if (
        searchResult.collections &&
        searchResult.collections.collections.length > 0
      ) {
        this.collections = searchResult.collections.collections;
      }
    }
  }

  deactivateSearch() {
    this.isSearchActive = false;
    this.isLoading = false;
    this.clearArrays();
  }

  clearArrays() {
    this.users = [];
    this.resources = [];
    this.collections = [];
  }

  async getResourceImage(resourceId: string) {
    const result: any = await this.resourceService.getResourceImage(resourceId);
    return result.image.link;
  }

  getImageLink(user: any) {
    if (user && user.image) {
      return user.image.link;
    }
  }

  goToUser(username: string) {
    this.isSearchActive = false;
    this.route.navigate([`/profile/user/${username}`], {
      relativeTo: this.router.parent
    });
  }

  goToResource(username: string, id: string) {
    this.isSearchActive = false;
    this.route.navigate([`/profile/user/${username}/resource/${id}`], {
      relativeTo: this.router.parent
    });
  }

  goToCollection(username: string, id: string) {
    this.isSearchActive = false;
    this.route.navigate([`/profile/user/${username}/collection/${id}`], {
      relativeTo: this.router.parent
    });
  }

  goToSearch() {
    const query = this.searchForm.get("query").value;
    if (query) {
      this.isSearchActive = false;
      this.searchForm.get("query").patchValue("");
      this.route.navigate([`/search`], {
        queryParams: { query },
        relativeTo: this.router.parent
      });
    }
  }
}
