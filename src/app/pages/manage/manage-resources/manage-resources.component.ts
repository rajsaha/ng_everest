import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResourceService } from '@services/resource/resource.service';
import { UtilityService } from '@services/general/utility.service';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-manage-resources',
  templateUrl: './manage-resources.component.html',
  styleUrls: ['./manage-resources.component.scss']
})
export class ManageResourcesComponent implements OnInit {
  userId: string;
  username: string;
  resources = [];
  resourcesCount = 0;
  resourceSearchForm: FormGroup;

  // Icons
  faSearch = faSearch;
  faFilter = faFilter;

  // Toggles
  isLoading = false;
  isInCollectionPage = false;

  // Infinite Scroll
  sum = 2;
  throttle = 300;
  scrollDistance = 2;
  scrollUpDistance = 2;

  // Pagination
  pageNo = 1;
  size = 8;

  constructor(
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private utilityService: UtilityService
  ) {}

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem("userId");
    await Promise.all([this.initResourceSearchForm(), this.getUserResources()]);
    this.onResourceSearchFormChange();
  }

  async initResourceSearchForm() {
    this.resourceSearchForm = this.fb.group({
      query: [''],
      filter: ['']
    });
  }

  async getUserResources() {
    try {
      this.isLoading = true;
      // Search
      const query = this.resourceSearchForm.get('query').value;
      if (query) {
        const searchResult: any = await this.resourceService.searchForUserResources({
          username: this.username,
          query
        });
        this.isLoading = false;
        this.resources = searchResult.resources;
        return;
      }

      // Without search
      const response: any = await this.resourceService.getUserResources({
        pageNo: this.pageNo,
        size: this.size,
        username: this.username,
        userId: this.userId
      });
      this.isLoading = false;
      this.resourcesCount = response.count;

      for (const resource of response.resources) {
        this.resources.push(resource);
      }
    } catch (err) {
      console.error(err);
    }
  }

  onScrollDown() {
    console.log('end');
    // await this.loadMorePosts();
  }

  async loadMorePosts() {
    this.pageNo++;
    await this.getUserResources();
  }

  drResponseHandler(result: any) {
    if (result.resourceId) {
      for (const { item, index } of this.utilityService.toItemIndexes(
        this.resources
      )) {
        if (result.resourceId === item._id) {
          this.resources.splice(index, 1);
          return;
        }
      }
    }
  }

  onResourceSearchFormChange() {
    this.resourceSearchForm
      .get('query')
      .valueChanges.pipe(debounceTime(300))
      .subscribe(async () => {
        this.resources = [];
        await this.getUserResources();
      });
  }
}
