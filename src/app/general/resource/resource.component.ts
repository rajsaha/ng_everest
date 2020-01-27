import { Component, OnInit, Input } from '@angular/core';
import { faEye, faEdit, faTrashAlt, faExternalLinkAlt, faTimes, faFolderMinus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  @Input() data: any;
  @Input() collectionId: string;

  // Data
  id: string;
  url: string;
  title: string;
  tags = [];
  type: string;
  description: string;
  image = '';
  timestamp: any;
  allComments = [];
  resourceUser: string;
  recommended_by_count: number;

  // For permissions
  loggedInUser: string;
  routeUser: string;

  // Icons
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faExternalLinkAlt = faExternalLinkAlt;
  faTimes = faTimes;
  faFolderMinus = faFolderMinus;

  // Toggles
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('username');
    this.getRouteUserId();
    this.populateResource();
  }

  getRouteUserId() {
    this.router.parent.params.subscribe((param) => {
      this.routeUser = param.username;
    });
  }

  populateResource() {
    this.isLoading = true;
    this.id = this.data._id;
    this.resourceUser = this.data.username;
    this.url = this.data.url;
    this.title = this.data.title;
    this.type = this.data.type;
    this.description = this.data.description;
    this.image = this.data.image;
    this.timestamp = moment(this.data.timestamp.$date).fromNow();
    this.recommended_by_count = this.data.recommended_by_count;
    this.isLoading = false;
  }

  goToView() {
    this.route.navigate([`/profile/user/${this.resourceUser}/resource/${this.id}`], { relativeTo: this.router.parent });
  }

  goToEdit() {
    if (this.type === 'ext-content') {
      this.route.navigate([`/manage/resource/edit/${this.id}`], { relativeTo: this.router.parent });
    } else {
      this.route.navigate([`/manage/article/edit/${this.id}`], { relativeTo: this.router.parent });
    }
  }

}
