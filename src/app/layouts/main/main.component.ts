import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import {
  faUser,
  faSignOutAlt,
  faStream,
  faShareAlt,
  faBorderAll,
  faSearch,
  faPenAlt,
  faCog,
  faPlus,
  faUserAlt,
  faCompass
} from "@fortawesome/free-solid-svg-icons";
import { LoginService } from "@services/auth/login.service";
import { CommunicationService } from "@services/general/communication.service";
import { MatSidenav } from "@angular/material/sidenav";
import { filter } from "rxjs/operators";
import { ColorSchemeService } from '@services/color-scheme/color-scheme.service';
import { CustomColorSchemeService } from '@services/custom-color-scheme/custom-color-scheme.service';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  image: string;
  localStorageImage: string;
  localStorageTheme: string;
  checked = false;

  username: string;
  firstName: string;
  lastName: string;

  // Toggles
  isLoggedIn = false;
  isMenuActive = false;
  @ViewChild("snav") snav: MatSidenav;

  // Icons
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faStream = faStream;
  faShareAlt = faShareAlt;
  faBorderAll = faBorderAll;
  faSearch = faSearch;
  faPenAlt = faPenAlt;
  faCog = faCog;
  faPlus = faPlus;
  faUserAlt = faUserAlt;
  faCompass = faCompass;

  // Links
  links = [];

  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private communicationService: CommunicationService,
    private colorSchemeService: ColorSchemeService,
    private customColorSchemeService: CustomColorSchemeService
  ) {
    // Load Color Scheme
    this.colorSchemeService.load();
    this.localStorageTheme = this.customColorSchemeService.getCurrentTheme();
    if (this.localStorageTheme == 'dark') {
      this.checked = true;
      this.customColorSchemeService.setDarkTheme();
    } else {
      this.checked = false;
      this.customColorSchemeService.setLightTheme();
    }
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this.mobileQueryListener);
    this.communicationService.authState.subscribe((res) => {
      this.isLoggedIn = res;
    });

    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.snav.toggle(false);
        this.isMenuActive = false;
      });
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.localStorageImage = localStorage.getItem("profileImage");
    this.image = this.localStorageImage ? this.localStorageImage : "";
    this.firstName = localStorage.getItem("firstName");
    this.lastName = localStorage.getItem("lastName");
    this.setLinks();
  }

  setLinks() {
    this.links = [{
      routerLink: "/",
      icon: this.faStream,
      text: "Feed"
    }, {
      routerLink: "/explore",
      icon: this.faCompass,
      text: "Explore"
    }, {
      routerLink: "/share-resource",
      icon: this.faPlus,
      text: "Share Resource"
    }, {
      routerLink: `/profile/user/${this.username}`,
      icon: this.faUserAlt,
      text: "Profile"
    }, {
      routerLink: "/profile/settings",
      icon: this.faCog,
      text: "Settings"
    }];
  }

  logout() {
    this.loginService.logout();
    this.colorSchemeService.update("light");
    this.customColorSchemeService.setLightTheme();
    this.router.navigate(["login"]);
    this.isLoggedIn = false;
  }

  goToShareResource() {
    this.router.navigate(
      [`/share-resource`],
      { relativeTo: this.route.parent }
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this.mobileQueryListener);
  }

  onToggleChange($event: any) {
    if ($event.checked) {
      this.customColorSchemeService.setDarkTheme();
    } else {
      this.customColorSchemeService.setLightTheme();
    }
  }
}
