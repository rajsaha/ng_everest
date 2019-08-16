import { Component, OnInit } from '@angular/core';
import { CollectionService } from '@services/collection/collection.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-collections',
  templateUrl: './manage-collections.component.html',
  styleUrls: ['./manage-collections.component.scss']
})
export class ManageCollectionsComponent implements OnInit {
  username: string;
  collections: any;
  collectionSearchForm: FormGroup;

  // Icons
  faSearch = faSearch;

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService) { }

  async ngOnInit() {
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

}
