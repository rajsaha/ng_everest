import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ResourceService } from "@services/resource/resource.service";
import { UtilityService } from "@services/general/utility.service";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { debounceTime } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  unsetResourceQuery,
} from "@services/ngrx/searchQueries/searchQueries.actions";

@Component({
  selector: "app-manage-resources",
  templateUrl: "./manage-resources.component.html",
  styleUrls: ["./manage-resources.component.scss"],
})
export class ManageResourcesComponent implements OnInit {
  @Input() userData: any;
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

  // Store
  searchQueriesState$: Observable<any>;
  resourceSearchQuery: string;

  constructor(
    private resourceService: ResourceService,
    private utilityService: UtilityService,
    private store: Store<{ searchQueriesState: any }>
  ) {
    this.searchQueriesState$ = store.pipe(select("searchQueriesState"));
  }

  async ngOnInit() {
    this.monitorNgrxState();
  }

  async getUserResources() {
    try {
      this.isLoading = true;
      // Without search
      const response: any = await this.resourceService.getUserResources({
        pageNo: this.pageNo,
        size: this.size,
        username: this.userData.username,
        userId: this.userData.userId,
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
    console.log("end");
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

  async onResourceSearch(query: string) {
    this.isLoading = true;
    const result: any = await this.resourceService.searchForUserResources({
      userId: this.userData.userId,
      query,
    });
    if (!result.error) {
      this.resources = [];
      for (let item of result.resources) {
        this.resources.push(item);
      }
    }
    this.isLoading = false;
  }

  monitorNgrxState() {
    this.store
      .select((state) => state)
      .pipe(debounceTime(1000))
      .subscribe(async (data: any) => {
        if (data.searchQueriesState.resourceQuery) {
          await this.onResourceSearch(data.searchQueriesState.resourceQuery);
          this.resourceSearchQuery = data.searchQueriesState.resourceQuery;
          this.store.dispatch(unsetResourceQuery());
        } else {
          this.resources = [];
          await this.getUserResources();
        }
      });
  }
}
