import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { NavigationStart, Router } from "@angular/router";
import {
  faUser,
  faSignOutAlt,
  faStream,
  faShareAlt,
  faBorderAll,
  faSearch,
  faPenAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { LoginService } from "@services/auth/login.service";
import { CommunicationService } from "@services/general/communication.service";
import { environment as ENV } from "@environments/environment";
import { MatSidenav } from "@angular/material/sidenav";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  image: string;
  localStorageImage: string;
  defaultProfileImage = `${ENV.SITE_URL}/assets/images/portrait.jpg`;

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

  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private loginService: LoginService,
    private communicationService: CommunicationService
  ) {
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
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["login"]);
    this.isLoggedIn = false;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this.mobileQueryListener);
  }
}
