import { Component, OnInit } from "@angular/core";
import { PopoverRef } from "src/app/components/popover/popover-ref";
import { faTrashAlt, faShare, faPen } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DrComponent } from "../../dialogs/dr/dr.component";

@Component({
  selector: "app-resource-options",
  templateUrl: "./resource-options.component.html",
  styleUrls: ["./resource-options.component.scss"]
})
export class ResourceOptionsComponent implements OnInit {
  resourceId: string;
  resourceUser: string;
  type: string;
  title: string;

  // Icons
  faTrashAlt = faTrashAlt;
  faShare = faShare;
  faPen = faPen;

  constructor(
    private dialog: MatDialog,
    private popoverRef: PopoverRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.resourceId = this.popoverRef.data.resourceId;
    this.resourceUser = this.popoverRef.data.resourceUser;
    this.type = this.popoverRef.data.type;
    this.title = this.popoverRef.data.title;
  }

  goToView() {
    this.router.navigate(
      [`/profile/user/${this.resourceUser}/resource/${this.resourceId}`],
      { relativeTo: this.route.parent }
    );
    this.close();
  }

  goToEdit() {
    if (this.type === "ext-content") {
      this.router.navigate([`/manage/resource/edit/${this.resourceId}`], {
        relativeTo: this.route.parent
      });
    } else {
      this.router.navigate([`/manage/article/edit/${this.resourceId}`], {
        relativeTo: this.route.parent
      });
    }
    this.close();
  }

  openDeleteResourceDialog() {
    const dialogRef = this.dialog.open(DrComponent, {
      data: { id: this.resourceId, title: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      let isDeleted = false;
      if (result) {
        isDeleted = true;
      }
      this.close(isDeleted);
    });
  }

  close(isDeleted = false) {
    this.popoverRef.close({
      isDeleted
    });
  }
}
