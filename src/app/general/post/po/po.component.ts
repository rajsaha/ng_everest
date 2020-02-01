import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { faShare, faShareAlt, faLink, faBackspace } from '@fortawesome/free-solid-svg-icons';
import { PopoverRef } from 'src/app/components/popover/popover-ref';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.scss']
})
export class PoComponent implements OnInit {
  id: string;
  username: string;

  // Icons
  faShare = faShare;
  faShareAlt = faShareAlt;
  faLink = faLink;
  faBackspace = faBackspace;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private popoverRef: PopoverRef) { }

  ngOnInit() {
    this.id = this.popoverRef.data.resourceId;
    this.username = this.popoverRef.data.username;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  goToView() {
    this.router.navigate([`/profile/user/${this.username}/resource/${this.id}`], { relativeTo: this.route.parent });
    this.close();
  }

  close() {
    this.popoverRef.close();
  }

}
