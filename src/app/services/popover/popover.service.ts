import { Injectable, Injector } from "@angular/core";
import {
  Overlay,
  ConnectionPositionPair,
  PositionStrategy,
  OverlayConfig
} from "@angular/cdk/overlay";
import { PortalInjector, ComponentPortal } from "@angular/cdk/portal";
import { PopoverRef, PopoverContent } from "src/app/components/popover/popover-ref";
import { PopoverComponent } from 'src/app/components/popover/popover.component';

export type PopoverParams<T> = {
  width?: string | number;
  height?: string | number;
  origin: HTMLElement;
  content: PopoverContent;
  data?: T;
};

@Injectable({
  providedIn: "root"
})
export class PopoverService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>({
    origin,
    content,
    data,
    width,
    height,
  }: PopoverParams<T>, position?: string): PopoverRef<T> {
    const overlayRef = this.overlay.create(
      this.getOverlayConfig({ origin, width, height }, position)
    );
    const popoverRef = new PopoverRef<T>(overlayRef, content, data);

    const injector = this.createInjector(popoverRef, this.injector);
    overlayRef.attach(new ComponentPortal(PopoverComponent, null, injector));

    return popoverRef;
  }

  private getOverlayConfig({ origin, width, height }, position): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: true,
      width,
      height,
      backdropClass: "popover-backdrop",
      positionStrategy: this.getOverlayPosition(origin, position),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  private getOverlayPosition(origin: HTMLElement, position): PositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions(this.getPositions(position))
      .withFlexibleDimensions(false)
      .withPush(false);

    return positionStrategy;
  }

  createInjector(popoverRef: PopoverRef, injector: Injector) {
    const tokens = new WeakMap([[PopoverRef, popoverRef]]);
    return new PortalInjector(injector, tokens);
  }

  private getPositions(position?: string): ConnectionPositionPair[] {
    if (position === "vertical") {
      return [
        {
          originX: "start",
          originY: "bottom",
          overlayX: "start",
          overlayY: "top"
        },
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top"
        }
      ];
    }
    return [
      {
        originX: "end",
        originY: "top",
        overlayX: "start",
        overlayY: "top"
      },
      {
        originX: "center",
        originY: "top",
        overlayX: "center",
        overlayY: "top"
      }
    ];
  }
}
