import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ResourceService } from "@services/resource/resource.service";
import { UtilityService } from "@services/general/utility.service";
import { faSearch, faFilter, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { debounceTime, takeUntil } from "rxjs/operators";
import { ActionsSubject } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { ofType } from "@ngrx/effects";
import { setResourceQuery } from "@services/ngrx/searchQueries/searchQueries.actions";

@Component({
  selector: "app-manage-resources",
  templateUrl: "./manage-resources.component.html",
  styleUrls: ["./manage-resources.component.scss"],
})
export class ManageResourcesComponent implements OnInit, OnDestroy {
  @Input() userData: any;
  resources = [];
  resourcesCount = 0;
  resourceSearchForm: FormGroup;

  // Icons
  faSearch = faSearch;
  faFilter = faFilter;
  faArrowDown = faArrowDown;

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
  destroy$ = new Subject<boolean>();

  constructor(
    private resourceService: ResourceService,
    private utilityService: UtilityService,
    private actionsListener$: ActionsSubject
  ) {
    this.actionsListener$
      .pipe(ofType(setResourceQuery))
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(1000))
      .subscribe(async (data: any) => {
        if (data.query.resourceQuery) {
          await this.onResourceSearch(data.query.resourceQuery);
          this.resourceSearchQuery = data.query.resourceQuery;
        } else {
          this.resources = [];
          await this.getUserResources();
        }
      });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

      if (!response.error) {
        this.resourcesCount = response.count;

        for (const resource of response.resources) {
          this.resources.push(resource);
        }
      }
      this.isLoading = false;
    } catch (err) {
      console.error(err);
    }
  }

  onScrollDown() { }

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
}
