import { Component, OnInit, Input } from '@angular/core';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-delete-resource-from-collection',
  templateUrl: './delete-resource-from-collection.component.html',
  styleUrls: ['./delete-resource-from-collection.component.scss']
})
export class DeleteResourceFromCollectionComponent implements OnInit {
  @Input() data: any;
  isActive = false;
  // Icons
  faTimesCircle = faTimesCircle;
  constructor() { }

  ngOnInit() {
  }

  toggleActive(status: boolean) {
    this.isActive = status;
  }
}
