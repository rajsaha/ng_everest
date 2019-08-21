import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '@services/resource/resource.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.scss']
})
export class ViewResourceComponent implements OnInit {
  id: string;
  resource: any;
  currentUser: string;
  isEditable = false;

  // Icons
  faPen = faPen;

  // Toggles
  isLoading = false;

  constructor(
    private route: ActivatedRoute, 
    private resourceService: ResourceService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.currentUser = localStorage.getItem('username');
      this.id = params.id;
      this.getResource(params.id);
    });
  }

  async getResource(id: string) {
    try {
      this.isLoading = true;
      const response = await this.resourceService.getResource({id});
      this.isLoading = false;
      this.resource = response.resource;
      this.checkIfEditable(this.resource.username);
    } catch (err) {
      console.error(err);
    }
  }

  goToEdit() {
    this.router.navigate(['/manage/resource/', this.id]);
  }

  checkIfEditable(username) {
    if (this.currentUser === username) {
      this.isEditable = true;
    }
  }

}
