import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { CollectionService } from "@services/collection/collection.service";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { debounceTime, takeUntil } from "rxjs/operators";
import { ActionsSubject, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { setRefreshCollectionsToFalse, setRefreshCollectionsToTrue } from "@services/ngrx/refreshCollections/refreshCollections.actions";
import { setCollectionQuery } from "@services/ngrx/searchQueries/searchQueries.actions";
import { ofType } from '@ngrx/effects';
import { FadeIn } from 'src/app/animations/fade-in/fade-in';

@Component({
  selector: "app-manage-collections",
  templateUrl: "./manage-collections.component.html",
  styleUrls: ["./manage-collections.component.scss"],
  animations: [FadeIn]
})
export class ManageCollectionsComponent implements OnInit, OnDestroy {
  @Input() userData: any;
  collections = [];
  collectionUrl = "collection/";
  collectionQuery: string;

  // Toggles
  isLoading = false;

  // Icons
  faSearch = faSearch;

  // Store
  refreshCollectionsState$: Observable<boolean>;
  destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private collectionService: CollectionService,
    private actionsListener$: ActionsSubject,
    private store: Store<{ searchQueriesState: any }>
  ) { }

  async ngOnInit() {
    this.setCollectionUrl();
    this.listenToState();
    // await this.getAllCollections();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listenToState() {
    this.actionsListener$
      .pipe(ofType(setCollectionQuery, setRefreshCollectionsToTrue))
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(1000))
      .subscribe(async (data: any) => {
        if (data.type == "[View Collections Component] Refresh - set to TRUE") {
          this.collections = [];
          await this.getAllCollections();
          this.store.dispatch(setRefreshCollectionsToFalse());
        } else if (data.query.collectionQuery) {
          await this.onCollectionSearch(
            data.query.collectionQuery
          );
        } else {
          this.collections = [];
          await this.getAllCollections();
        }
      }); 
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
}
