import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators';
import { UserService } from '@services/user/user.service';
import { faBorderAll, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ResourceService } from '@services/resource/resource.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
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
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.initSearchForm();
    this.onSearchFormChanges();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  get query() {
    return this.searchForm.get('query').value;
  }

  onSearchFormChanges() {
    this.searchForm.get('query').valueChanges.pipe(debounceTime(300)).subscribe(async (query) => {
      if (query) {
        this.isSearchActive = false;
        this.isLoading = true;
        const searchResult = await this.userService.globalSearch(encodeURIComponent(query));

        this.isSearchActive = true;
        this.isLoading = false;
        if (searchResult.users && searchResult.users.users.length > 0) {
          this.users = searchResult.users.users;
        }

        if (searchResult.resources && searchResult.resources.resources.length > 0) {
          this.resources = searchResult.resources.resources;
        }

        if (searchResult.collections && searchResult.collections.collections.length > 0) {
          this.collections = searchResult.collections.collections;
        }
      }
    });
  }

  async activateSearch() {
    if (this.searchForm.get('query').value) {
      this.isSearchActive = false;
      this.isLoading = true;
      const searchResult = await this.userService.globalSearch(encodeURIComponent(this.searchForm.get('query').value));
      this.isSearchActive = true;
      this.isLoading = false;
      if (searchResult.users && searchResult.users.users.length > 0) {
        this.users = searchResult.users.users;
      }

      if (searchResult.resources && searchResult.resources.resources.length > 0) {
        this.resources = searchResult.resources.resources;
      }

      if (searchResult.collections && searchResult.collections.collections.length > 0) {
        this.collections = searchResult.collections.collections;
      }
    }
  }

  deactivateSearch() {
    this.isSearchActive = false;
    this.isLoading = false;
    this.users = [];
    this.resources = [];
    this.collections = [];
  }

  async getResourceImage(resourceId: string) {
    const result = await this.resourceService.getResourceImage(resourceId);
    console.log(result);
    return result.image.link;
  }

  getImageLink(user: any) {
    if (user && user.image) {
      return user.image.link;
    }
  }

  goToUser(username: string) {
    this.isSearchActive = false;
    this.route.navigate([`/profile/user/${username}`], { relativeTo: this.router.parent });
  }

  goToResource(username: string, id: string) {
    this.isSearchActive = false;
    this.route.navigate([`/profile/user/${username}/resource/${id}`], { relativeTo: this.router.parent });
  }

  goToCollection(username: string, id: string) {
    this.isSearchActive = false;
    this.route.navigate([`/profile/user/${username}/collection/${id}`], { relativeTo: this.router.parent });
  }

}
