import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyState } from '@models/emptyState.model';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})

export class EmptyStateComponent implements OnInit {
  @Input() data: EmptyState;
  text = "Nothing here";
  action = false;

  // Icons
  faPlus = faPlus;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setup();
  }

  setup() {
    switch (this.data.type) {
      case "collection":
        this.text = "No collection";
        break;
      case "resource":
        if (this.data.isSelf) {
          this.text = "Create a resource";
          this.action = true;
        } else {
          this.text = "No resource";
          this.action = false;
        }
        break;
      case "feed":
        this.text = "Your feed is empty";
        break;
      default:
        break;  
    }
  }

  goToShareResource() {
    this.router.navigate([`/share-resource`], {
      relativeTo: this.route.parent,
    });
  }

}
