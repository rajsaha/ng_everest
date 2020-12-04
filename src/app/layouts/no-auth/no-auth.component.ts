import { Component, OnInit } from '@angular/core';
import { CustomColorSchemeService } from '@services/custom-color-scheme/custom-color-scheme.service';

@Component({
  selector: 'app-no-auth',
  templateUrl: './no-auth.component.html',
  styleUrls: ['./no-auth.component.scss']
})
export class NoAuthComponent implements OnInit {
  localStorageTheme: string;
  logo: string;
  constructor(private customColorSchemeService: CustomColorSchemeService) {}

  ngOnInit() {
    this.localStorageTheme = this.customColorSchemeService.getCurrentTheme();
    if (this.localStorageTheme == 'dark') {
      this.logo = "../../../assets/images/everest-logo-dark.svg";
    } else {
      this.logo = "../../../assets/images/everest-logo.svg";
    }
  }

}
