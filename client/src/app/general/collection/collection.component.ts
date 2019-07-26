import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
