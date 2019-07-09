import { Component, OnInit, Input } from '@angular/core';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  @Input() data: any;

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  populateResource() {
    this.id = this.data.id;
    this.url = this.data.url;
    this.title = this.data.title;
    this.tags = this.data.tags;
    this.description = this.data.description;
    this.image = this.data.image;
    this.timestamp = moment(this.data.timestamp.$date).fromNow();
    this.allComments = this.data.comments;
  }

}
