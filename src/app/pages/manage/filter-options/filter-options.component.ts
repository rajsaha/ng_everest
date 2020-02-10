import { Component, OnInit } from '@angular/core';
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss']
})
export class FilterOptionsComponent implements OnInit {
  // Icons
  faThumbsUp = faThumbsUp;
  constructor() { }

  ngOnInit() {
  }

}
