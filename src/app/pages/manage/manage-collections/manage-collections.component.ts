import { Component, OnInit, Input } from "@angular/core";
import { CollectionService } from "@services/collection/collection.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { debounceTime } from "rxjs/operators";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setRefreshCollectionsToFalse } from '@services/ngrx/refreshCollections.actions';  

@Component({
  selector: "app-manage-collections",
  templateUrl: "./manage-collections.component.html",
  styleUrls: ["./manage-collections.component.scss"],
})
export class ManageCollectionsComponent implements OnInit {
  @Input() userData: any;
  collections: any;
  collectionSearchForm: FormGroup;
  collectionUrl = "collection/";

  // Toggles
  isLoading = false;

  // Icons
  faSearch = faSearch;

  // Store
  refreshCollectionsState$: Observable<boolean>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private store: Store<{ refreshCollectionsState: boolean }>
  ) {
    this.refreshCollectionsState$ = store.pipe(select('refreshCollectionsState'));
  }

  async ngOnInit() {
    this.setCollectionUrl();
    this.initCollectionSearchForm();
    await this.getAllCollections();
    this.onCollectionSearchFormChange();
    this.monitorRefreshCollectionsState();
  }

  async initCollectionSearchForm() {
    this.collectionSearchForm = this.fb.group({
      query: [""],
    });
  }

  async getAllCollections() {
    try {
      this.isLoading = true;
      const query = this.collectionSearchForm.get("query").value;
      if (query) {
        const searchResult: any = await this.collectionService.searchUserCollections(
          { username: this.userData.username, title: query }
        );
        this.isLoading = false;
        this.collections = searchResult.collections;
        return;
      }
      const response: any = await this.collectionService.getCollections({
        username: this.userData.username,
        pageNo: 1,
        size: 100,
      });
      this.isLoading = false;
      this.collections = response.collections[0].collections;
    } catch (err) {
      console.error(err);
    }
  }

  onCollectionSearchFormChange() {
    this.collectionSearchForm
      .get("query")
      .valueChanges.pipe(debounceTime(300))
      .subscribe(async (query) => {
        this.isLoading = true;
        const searchResult: any = await this.collectionService.searchUserCollections(
          { username: this.userData.username, title: query }
        );
        this.isLoading = false;
        this.collections = searchResult.collections;
      });
  }

  setCollectionUrl() {
    const url = this.router.url;
    if (url === "/manage/collection") {
      this.collectionUrl = "../collection";
    }
  }

  monitorRefreshCollectionsState() {
    this.store.select(state => state).subscribe(async (data: any) => {
      if (data.collectionsRefreshState) {
        await this.getAllCollections();
        this.store.dispatch(setRefreshCollectionsToFalse());
      }
    });
  }
}
