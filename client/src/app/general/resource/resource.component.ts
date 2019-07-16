import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEye, faEdit, faTrashAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { DrComponent } from '../dialogs/dr/dr.component';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  @Input() data: any;
  @Output() drResponse: EventEmitter<number> = new EventEmitter();

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

  constructor(public dialog: MatDialog) { }

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

    dialogRef.afterClosed().subscribe(async (result) => {
      this.drResponse.emit(result);
    });
  }

}
