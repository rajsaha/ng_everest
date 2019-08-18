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
  image: string;
  timestamp: any;
  allComments = [];

  // Icons
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faExternalLinkAlt = faExternalLinkAlt;
  faTimes = faTimes;
  faFolderMinus = faFolderMinus;

  constructor(
    public dialog: MatDialog,
    private collectionService: CollectionService,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.populateResource();
  }

  populateResource() {
    this.id = this.data._id;
    this.url = this.data.url;
    this.title = this.data.title;
    this.tags = this.data.tags;
    this.description = this.data.description;
    this.image = this.data.image;
    this.timestamp = moment(this.data.timestamp.$date).fromNow();
    this.allComments = this.data.comments;
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

  goToEdit() {
    this.route.navigate(['resource/edit/', this.id]);
  }

}
