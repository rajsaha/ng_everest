import { Component, OnInit, TemplateRef } from "@angular/core";
import { PopoverRef, PopoverContent } from "./popover-ref";
import { trigger, transition, state, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
const ANIMATION_TIMINGS_ENTER = '150ms cubic-bezier(0.25, 0.8, 0.25, 1)';
const ANIMATION_TIMINGS_LEAVE = '75ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ "transform-origin": "0% 50%", transform: "scale(1)", opacity: 1 })),
      transition(':enter', [
        style({ transform: "scale(0)", opacity: 1 }),
        animate(ANIMATION_TIMINGS_ENTER)
      ]),
      transition(':leave', [
        animate(ANIMATION_TIMINGS_LEAVE, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PopoverComponent implements OnInit {
  renderMethod: "template" | "component" | "text" = "component";
  content: PopoverContent;
  context;
  position = "horizontal";
  positionClass = "position-horizontal";
  themeClass = "popover-light-theme";

  constructor(private popoverRef: PopoverRef, private store: Store) { }

  ngOnInit() {
    this.content = this.popoverRef.content;
    if (this.popoverRef.data.position) {
      this.position = this.popoverRef.data.position;
    }

    switch (this.position) {
      case "horizontal":
        this.positionClass = "position-horizontal";
        break;
      case "vertical":
        this.positionClass = "position-vertical";
        break;
      default:
        this.positionClass = "position-horizontal";
        break;
    }

    if (typeof this.content === "string") {
      this.renderMethod = "text";
    }

    if (this.content instanceof TemplateRef) {
      this.renderMethod = "template";
      this.context = {
        close: this.popoverRef.close.bind(this.popoverRef)
      };
    }

    this.monitorStoreState();
  }

  monitorStoreState() {
    this.store
      .select((state) => state)
      .subscribe((data: any) => {
        switch (data.appThemeState) {
          case "light":
            this.themeClass = "popover-light-theme";
            break;
          case "dark":
            this.themeClass = "popover-dark-theme";
            break;
          default:
            this.themeClass = "popover-light-theme";
            break;  
        }
      });
  }
}
