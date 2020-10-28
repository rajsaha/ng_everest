import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomColorSchemeService } from '@services/custom-color-scheme/custom-color-scheme.service';
import { StorageService } from '@services/local-storage/local-storage.service';

export function themeFactory(themeService: CustomColorSchemeService) {
  return () => themeService.setThemeOnStart();
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CustomColorSchemeService,
    StorageService,
    { provide: APP_INITIALIZER, useFactory: themeFactory, deps: [CustomColorSchemeService], multi: true }
  ]
})
export class UiModule { }
