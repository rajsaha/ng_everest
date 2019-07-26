import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ResourceService } from '@services/resource/resource.service';
import { UtilityService } from '@services/general/utility.service';
import { CollectionService } from '@services/collection/collection.service';

@Component({
  selector: 'app-manage-resources',
  templateUrl: './manage-resources.component.html',
  styleUrls: ['./manage-resources.component.scss']
})
export class ManageResourcesComponent implements OnInit {

  // Icons
  faSearch = faSearch;
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  resourceSearchForm: FormGroup;
  collectionSearchForm: FormGroup;
  username: any;
  resources: any;
  collections: any;

  constructor(
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private collectionService: CollectionService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.initForms();
    this.getAllResources();
    this.getAllCollections();
  }

  initForms() {
    this.resourceSearchForm = this.fb.group({
      query: ['']
    });

    this.collectionSearchForm = this.fb.group({
      query: ['']
    });
  }

  async getAllResources() {
    try {
      const response = await this.resourceService.getAllResources({username: this.username});
      this.resources = response.resources;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllCollections() {
    try {
      const response = await this.collectionService.getCollections({username: this.username});
      this.collections = response.collections;
    } catch (err) {
      console.error(err);
    }
  }

  drResponseHandler(result: number) {
    if (result) {
      for (const {item, index} of this.utilityService.toItemIndexes(this.resources)) {
        if (result === item._id) {
          this.resources.splice(index, 1);
          return;
        }
      }
    }
  }
}
