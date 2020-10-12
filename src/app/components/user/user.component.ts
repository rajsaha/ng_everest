import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() data: any;
  constructor(private route: Router, private router: ActivatedRoute) { }

  ngOnInit() {}

  parseImageLink(data: any) {
    if (data.smImage) {
      return data.smImage.link;
    } else {
      return '';
    }
  }

  goToUser(username: string) {
    this.route.navigate([`/profile/user/${username}`], { relativeTo: this.router.parent });
  }

}
