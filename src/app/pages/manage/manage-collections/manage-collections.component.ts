import { Component, OnInit } from '@angular/core';
import { CollectionService } from '@services/collection/collection.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-collections',
  templateUrl: './manage-collections.component.html',
  styleUrls: ['./manage-collections.component.scss']
})
export class ManageCollectionsComponent implements OnInit {
  username: string;
  collections: any;
  collectionSearchForm: FormGroup;
  collectionUrl = './collection';

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
  }

  async initCollectionSearchForm() {
    this.collectionSearchForm = this.fb.group({
      query: ['']
    });
  }

  async getAllCollections() {
    try {
      const response = await this.collectionService.getCollections({ username: this.username });
      this.collections = response.collections;
    } catch (err) {
      console.error(err);
    }
  }

  setCollectionUrl() {
    const url = this.router.url;
    if (url === '/manage/collection') {
      this.collectionUrl = '../collection';
    }
  }

}
