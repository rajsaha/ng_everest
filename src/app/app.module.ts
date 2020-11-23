import { BrowserModule } from "@angular/platform-browser";
import { NgModule, enableProdMode } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "@services/auth/auth-interceptor.service";
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { collectionsRefreshStateReducer } from "@services/ngrx/refreshCollections/refreshCollections.reducer";
import { noImageComponentStateReducer } from "@services/ngrx/noImageComponent/noImageComponent.reducer";
import { searchQueriesStateReducer } from "@services/ngrx/searchQueries/searchQueries.reducer";
import { appThemeStateReducer } from "@services/ngrx/appTheme/appTheme.reducer";

import { ManageModule } from "./modules/manage/manage.module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./modules/material/material.module";
import { GeneralModule } from "./modules/general/general.module";
import { DialogsModule } from "./modules/dialogs/dialogs.module";
import { FeedComponent } from "./pages/feed/feed.component";
import { AtcComponent } from "./components/dialogs/atc/atc.component";
import { PoComponent } from "./components/post/po/po.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { ShareResourceComponent } from "./pages/share-resource/share-resource.component";
import { MainComponent } from "./layouts/main/main.component";
import { NoAuthComponent } from "./layouts/no-auth/no-auth.component";
import { SearchComponent } from "./components/search/search.component";
import { AddToCollectionComponent } from "./components/add-to-collection/add-to-collection.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { UserComponent } from "./components/user/user.component";
import { PopoverComponent } from "./components/popover/popover.component";
import { EditCollectionComponent } from "./components/collection/edit-collection/edit-collection.component";
import { DeleteResourceFromCollectionComponent } from "./components/collection/delete-resource-from-collection/delete-resource-from-collection.component";
import { UiModule } from './modules/ui/ui.module';
import { NoAuthModule } from './modules/no-auth/no-auth.module';

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'Everest',
    defaults: {
      title: 'Login',
      'og:description': 'Social network lite for sharing and collecting resources off the net',
      'og:image': 'https://i.imgur.com/0U9tDfX.png',
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PoComponent,
    PageNotFoundComponent,
    ShareResourceComponent,
    MainComponent,
    NoAuthComponent,
    SearchComponent,
    AddToCollectionComponent,
    SearchPageComponent,
    UserComponent,
    PopoverComponent,
    EditCollectionComponent,
    DeleteResourceFromCollectionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({
      collectionsRefreshState: collectionsRefreshStateReducer,
      noImageComponentState: noImageComponentStateReducer,
      searchQueriesState: searchQueriesStateReducer,
      appThemeState: appThemeStateReducer
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NoAuthModule,
    ManageModule,
    DialogsModule,
    GeneralModule,
    UiModule,
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AtcComponent,
    PoComponent,
    SnackbarComponent,
    PopoverComponent,
  ],
})
export class AppModule {}

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
