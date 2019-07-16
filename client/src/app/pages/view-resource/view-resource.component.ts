import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '@services/resource/resource.service';

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.scss']
})
export class ViewResourceComponent implements OnInit {
  id: string;
  resource: any;
  constructor(private router: ActivatedRoute, private resourceService: ResourceService) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.id = params.id;
      this.getResource();
    });
  }

  async getResource() {
    const response = await this.resourceService.getResource({id: this.id});
    this.resource = response.resource;
    console.log(this.resource);
  }

}
