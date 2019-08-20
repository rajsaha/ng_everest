import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResourceService } from '@services/resource/resource.service';
import { UtilityService } from '@services/general/utility.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { delay } from 'rxjs/internal/operators';

@Component({
  selector: 'app-manage-resources',
  templateUrl: './manage-resources.component.html',
  styleUrls: ['./manage-resources.component.scss']
})
export class ManageResourcesComponent implements OnInit {
  username: string;
  resources: any;
  resourceSearchForm: FormGroup;

  // Icons
  faSearch = faSearch;

  constructor(
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private utilityService: UtilityService) { }

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    await Promise.all([this.initResourceSearchForm(), this.getUserResources()]);
    this.onResourceSearchFormChange();
  }

  async initResourceSearchForm() {
    this.resourceSearchForm = this.fb.group({
      query: ['']
    });
  }

  async getUserResources() {
    try {
      const query = this.resourceSearchForm.get('query').value;
      if (query) {
        const searchResult = await this.resourceService.searchForUserResources({username: this.username, query});
        this.resources = searchResult.resources;
        return;
      }
      const response = await this.resourceService.getUserResources({username: this.username});
      this.resources = response.resources;
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

  onResourceSearchFormChange() {
    this.resourceSearchForm.get('query').valueChanges.pipe(delay(1500)).subscribe(async (query) => {
      const searchResult = await this.resourceService.searchForUserResources({username: this.username, query});
      this.resources = searchResult.resources;
    });
  }

}
