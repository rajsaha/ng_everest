import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { faUser, faSignOutAlt, faStream, faShareAlt, faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { LoginService } from '@services/auth/login.service';
import { CommunicationService } from '@services/general/communication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  isLoggedIn = false;
  image: string;
  localStorageImage: string;
  defaultProfileImage = '../assets/portrait.jpg';

  // Toggles
  isMenuActive = false;

  // Icons
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faStream = faStream;
  faShareAlt = faShareAlt;
  faSquare = faSquare;
  faBorderAll = faBorderAll;

  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private loginService: LoginService,
    private communicationService: CommunicationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.communicationService.authState.subscribe((res) => {
      this.isLoggedIn = res;
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.localStorageImage = localStorage.getItem('profileImage');
    this.image = this.localStorageImage ? this.localStorageImage : this.defaultProfileImage;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
    this.isLoggedIn = false;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
