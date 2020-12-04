import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCog, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '@services/auth/login.service';
import { ColorSchemeService } from '@services/color-scheme/color-scheme.service';
import { CustomColorSchemeService } from '@services/custom-color-scheme/custom-color-scheme.service';
import { PopoverRef } from 'src/app/components/popover/popover-ref';

@Component({
  selector: 'app-mo',
  templateUrl: './mo.component.html',
  styleUrls: ['./mo.component.scss']
})
export class MoComponent implements OnInit {
  username: string;

  // Icons
  faUser = faUser;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private popoverRef: PopoverRef,
    private loginService: LoginService,
    private colorSchemeService: ColorSchemeService,
    private customColorSchemeService: CustomColorSchemeService
  ) { }

  ngOnInit(): void {
    this.username = this.popoverRef.data.username;
  }

  viewProfile() {
    this.router.navigate(
      [`/profile/user/${this.username}`],
      { relativeTo: this.route.parent }
    );
    this.close();
  }

  viewSettings() {
    this.router.navigate([`/profile/settings`], {
      relativeTo: this.route.parent,
    });
    this.close();
  }

  close() {
    this.popoverRef.close();
  }

  logout() {
    this.close();
    this.loginService.logout();
    this.colorSchemeService.update("light");
    this.customColorSchemeService.setLightTheme();
    this.router.navigate(["login"]);
  }

}
