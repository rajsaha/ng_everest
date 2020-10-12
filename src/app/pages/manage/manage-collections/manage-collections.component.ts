import { Component, OnInit, Input } from "@angular/core";
import { CollectionService } from "@services/collection/collection.service";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { debounceTime } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { setRefreshCollectionsToFalse } from "@services/ngrx/refreshCollections/refreshCollections.actions";
import { unsetCollectionQuery } from "@services/ngrx/searchQueries/searchQueries.actions";

@Component({
  selector: "app-manage-collections",
  templateUrl: "./manage-collections.component.html",
  styleUrls: ["./manage-collections.component.scss"],
})
export class ManageCollectionsComponent implements OnInit {
  @Input() userData: any;
  collections: any;
  collectionUrl = "collection/";
  collectionQuery: string;

  // Toggles
  isLoading = false;

  // Icons
  faSearch = faSearch;

  // Store
  refreshCollectionsState$: Observable<boolean>;

  constructor(
    private router: Router,
    private collectionService: CollectionService,
    private store: Store<{ refreshCollectionsState: boolean }>
  ) {
    this.refreshCollectionsState$ = store.pipe(
      select("refreshCollectionsState")
    );
  }

  async ngOnInit() {
    this.setCollectionUrl();
    this.monitorNgrxState();
  }

  async getAllCollections() {
    try {
      this.isLoading = true;
      const response: any = await this.collectionService.getCollections({
        username: this.userData.username,
        pageNo: 1,
        size: 100,
      });
      for (let item of response.collections[0].collections) {
        this.collections.push(item);
      }
      this.isLoading = false;
    } catch (err) {
      console.error(err);
    }
  }

  async onCollectionSearch(query: string) {
    this.isLoading = true;
    const result: any = await this.collectionService.searchUserCollections({
      username: this.userData.username,
      query,
    });
    if (!result.error) {
      this.collections = [];
      for (let item of result.collections[0].collections) {
        this.collections.push(item);
      }
    }
    this.isLoading = false;
  }

  setCollectionUrl() {
    const url = this.router.url;
    if (url === "/manage/collection") {
      this.collectionUrl = "../collection";
    }
  }

  monitorNgrxState() {
    this.store
      .select((state) => state)
      .pipe(debounceTime(1000))
      .subscribe(async (data: any) => {
        if (data.collectionsRefreshState) {
          await this.getAllCollections();
          this.store.dispatch(setRefreshCollectionsToFalse());
        }

        if (data.searchQueriesState.collectionQuery) {
          await this.onCollectionSearch(
            data.searchQueriesState.collectionQuery
          );
        } else {
          this.collections = [];
          await this.getAllCollections();
        }
      });
  }
}
