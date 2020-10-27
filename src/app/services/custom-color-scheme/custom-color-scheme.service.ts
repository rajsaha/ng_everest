import { Injectable } from '@angular/core';
import { ColorSchemeService } from '@services/color-scheme/color-scheme.service';
import { StorageService } from '@services/local-storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';

export enum ThemeMode {
  DARK, LIGHT
}

@Injectable({
  providedIn: 'root'
})
export class CustomColorSchemeService {
  private readonly THEME_KEY = "THEME";
  private readonly DARK_THEME_VALUE = "DARK";
  private readonly LIGHT_THEME_VALUE = "LIGHT";
  private readonly DARK_THEME_CLASS_NAME = "theme-dark";

  private darkThemeSelected = false;
  public theme$ = new BehaviorSubject<ThemeMode>(ThemeMode.LIGHT);

  constructor(private storage: StorageService, private colorSchemeService: ColorSchemeService) { }

  public setThemeOnStart() {
    if (this.isDarkThemeSelected()) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  private isDarkThemeSelected(): boolean {
    this.darkThemeSelected = this.storage.get(this.THEME_KEY) === this.DARK_THEME_VALUE;
    return this.darkThemeSelected;
  }

  public getCurrentTheme() {
    let theme: string = this.storage.get(this.THEME_KEY);
    return theme.toLowerCase();
  }

  public setLightTheme() {
    this.colorSchemeService.update("light");
    this.storage.set(this.THEME_KEY, this.LIGHT_THEME_VALUE);
    document.body.classList.remove(this.DARK_THEME_CLASS_NAME);
    this.darkThemeSelected = false;
    this.theme$.next(ThemeMode.LIGHT);
  }

  public setDarkTheme() {
    this.colorSchemeService.update("dark");
    this.storage.set(this.THEME_KEY, this.DARK_THEME_VALUE);
    document.body.classList.add(this.DARK_THEME_CLASS_NAME);
    this.darkThemeSelected = true;
    this.theme$.next(ThemeMode.DARK);
  }
}
