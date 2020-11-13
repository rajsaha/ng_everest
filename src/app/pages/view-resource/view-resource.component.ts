import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '@services/resource/resource.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.scss']
})
export class ViewResourceComponent implements OnInit {
  id: string;
  resource: any;
  currentUser: string;
  currentUserId: string;
  isEditable = false;

  // Icons
  faPen = faPen;

  // Toggles
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private router: Router) {}

  ngOnInit() {
    this.currentUser = localStorage.getItem('username');
    this.currentUserId = localStorage.getItem("userId");
    this.route.params.subscribe(async (params) => {
      this.resource = null;
      this.id = params.resourceId;
      await this.getResource(params.resourceId);
    });
  }

  async getResource(id: string) {
    try {
      this.isLoading = true;
      const response: any = await this.resourceService.getResource({resourceId: id, userId: this.currentUserId});
      this.isLoading = false;
      this.resource = response.resource;
      this.checkIfEditable(this.resource.username);
    } catch (err) {
      console.error(err);
    }
  }

  goToEdit() {
    if (this.resource.type === 'ext-content') {
      this.router.navigate(['/manage/resource/edit', this.id]);
    } else {
      this.router.navigate(['/manage/article/edit', this.id]);
    }
  }

  checkIfEditable(username: string) {
    if (this.currentUser === username) {
      this.isEditable = true;
    }
  }

}
