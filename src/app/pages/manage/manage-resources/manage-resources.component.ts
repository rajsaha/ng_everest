import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResourceService } from '@services/resource/resource.service';
import { UtilityService } from '@services/general/utility.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { delay, debounceTime } from 'rxjs/internal/operators';

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

  // Toggles
  isLoading = false;

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
      this.isLoading = true;
      const query = this.resourceSearchForm.get('query').value;
      if (query) {
        const searchResult = await this.resourceService.searchForUserResources({username: this.username, query});
        this.isLoading = false;
        this.resources = searchResult.resources;
        return;
      }
      const response = await this.resourceService.getUserResources({username: this.username});
      this.isLoading = false;
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
    this.resourceSearchForm.get('query').valueChanges.pipe(debounceTime(300), delay(1500)).subscribe(async (query) => {
      this.isLoading = true;
      const searchResult = await this.resourceService.searchForUserResources({username: this.username, query});
      this.isLoading = false;
      this.resources = searchResult.resources;
    });
  }

}
