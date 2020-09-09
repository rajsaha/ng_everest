import { Component, OnInit } from "@angular/core";
import { PopoverRef } from "src/app/components/popover/popover-ref";
import { ActivatedRoute, Router } from "@angular/router";
import {
  faPlusCircle,
  faEdit,
  faShare,
  faShareAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from "@angular/material/dialog";
import { EditCollectionComponent } from "../edit-collection/edit-collection.component";

@Component({
  selector: "app-collection-options",
  templateUrl: "./collection-options.component.html",
  styleUrls: ["./collection-options.component.scss"],
})
export class CollectionOptionsComponent implements OnInit {
  // Icons
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faShare = faShare;
  faShareAlt = faShareAlt;
  faTrash = faTrash;

  constructor(
    private popoverRef: PopoverRef,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  openEditCollectionDialog() {
    const dialogRef = this.dialog.open(EditCollectionComponent, {
      data: {
        collectionData: this.popoverRef.data.collectionData,
      },
      width: "600px",
      maxWidth: 600,
    });

    this.close();

    dialogRef.afterClosed().subscribe(async (result: any) => {});
  }

  close() {
    this.popoverRef.close();
  }
}
