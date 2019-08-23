import { Component, OnInit } from '@angular/core';
import { CollectionService } from '@services/collection/collection.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/internal/operators';

@Component({
  selector: 'app-manage-collections',
  templateUrl: './manage-collections.component.html',
  styleUrls: ['./manage-collections.component.scss']
})
export class ManageCollectionsComponent implements OnInit {
  username: string;
  collections: any;
  collectionSearchForm: FormGroup;
  collectionUrl = 'collection/';

  // Toggles
  isLoading = false;

  // Icons
  faSearch = faSearch;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private collectionService: CollectionService) { }

  async ngOnInit() {
    this.setCollectionUrl();
    this.username = localStorage.getItem('username');
    await Promise.all([this.initCollectionSearchForm(), this.getAllCollections()]);
    this.onCollectionSearchFormChange();
  }

  async initCollectionSearchForm() {
    this.collectionSearchForm = this.fb.group({
      query: ['']
    });
  }

  async getAllCollections() {
    try {
      this.isLoading = true;
      const query = this.collectionSearchForm.get('query').value;
      if (query) {
        const searchResult = await this.collectionService.searchUserCollections({username: this.username, title: query});
        this.isLoading = false;
        this.collections = searchResult.collections;
        return;
      }
      const response = await this.collectionService.getCollections({ username: this.username });
      this.isLoading = false;
      this.collections = response.collections;
    } catch (err) {
      console.error(err);
    }
  }

  onCollectionSearchFormChange() {
    this.collectionSearchForm.get('query').valueChanges.pipe(debounceTime(300)).subscribe(async (query) => {
      this.isLoading = true;
      const searchResult = await this.collectionService.searchUserCollections({username: this.username, title: query});
      this.isLoading = false;
      this.collections = searchResult.collections;
    });
  }

  setCollectionUrl() {
    const url = this.router.url;
    if (url === '/manage/collection') {
      this.collectionUrl = '../collection';
    }
  }

}
