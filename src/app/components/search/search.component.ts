import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // Form
  searchForm: FormGroup;

  // Toggles
  isSearchActive = false;

  @ViewChild('query', {static: false}) queryField: ElementRef;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.initSearchForm();
    this.onSearchFormChanges();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  get query() {
    return this.searchForm.get('query').value;
  }

  onSearchFormChanges() {
    this.searchForm.get('query').valueChanges.pipe(debounceTime(300)).subscribe(async (query) => {
      if (query) {
        // const searchResult = await this.userService.globalSearch(encodeURIComponent(query));
        // console.log(searchResult);
      }
    });
  }

  onSearchFocus() {
    this.isSearchActive = true;
  }

}
