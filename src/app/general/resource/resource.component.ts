import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEye, faEdit, faTrashAlt, faExternalLinkAlt, faTimes, faFolderMinus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { DrComponent } from '../dialogs/dr/dr.component';
import { CollectionService } from '@services/collection/collection.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  @Input() data: any;
  @Input() collectionId: string;
  @Input() isInCollectionPage: boolean;
  @Output() drResponse: EventEmitter<any> = new EventEmitter();

  // Data
  id: string;
  url: string;
  title: string;
  tags = [];
  description: string;
  image = '';
  timestamp: any;
  allComments = [];
  resourceUser: string;

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
    private collectionService: CollectionService,
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
    this.description = this.data.description;
    this.image = this.data.image;
    this.timestamp = moment(this.data.timestamp.$date).fromNow();
    this.isLoading = false;
  }

  openDrDialog() {
    const dialogRef = this.dialog.open(DrComponent, {
      data: {
        id: this.id,
        title: this.title
      }
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.drResponse.emit();
    });
  }

  async deleteResourceFromCollection() {
    const result = await this.collectionService.deleteResourceFromCollection({resourceId: this.id, collectionId: this.collectionId});
    if (result) {
      this.drResponse.emit(this.id);
    }
  }

  goToView() {
    this.route.navigate([`/profile/user/${this.resourceUser}/resource/${this.id}`], { relativeTo: this.router.parent });
  }

  goToEdit() {
    this.route.navigate([`/manage/resource/edit/${this.id}`], { relativeTo: this.router.parent });
  }

}
