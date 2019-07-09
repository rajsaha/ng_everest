import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ResourceService } from '@services/resource/resource.service';
import { MatDialog } from '@angular/material';

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

  searchForm: FormGroup;
  username: any;
  resources: any;

  constructor(
    private fb: FormBuilder,
    private resourceService: ResourceService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.initSearchForm();
    this.getAllResources();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
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
}
