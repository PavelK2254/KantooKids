import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatDialogModule} from '@angular/material';
 import {MatMenuModule} from '@angular/material/menu';
 import {MatToolbarModule} from '@angular/material/toolbar';
 import {MatIconModule} from '@angular/material';
 import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatInputModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TestFrameComponent } from './test-frame/test-frame.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { PromoPopupComponent } from './promo-popup/promo-popup.component';
import {MatExpansionModule} from '@angular/material/expansion';

 import { DeviceDetectorModule } from 'ngx-device-detector';
import { HomePageComponent } from './home-page/home-page.component';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { ContactusComponent } from './contactus/contactus.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    TestFrameComponent,
    PageNotFoundComponent,
    SubMenuComponent,
    MovieItemComponent,
    PromoPopupComponent,
    HomePageComponent,
    ContactusComponent,
    MobileMenuComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    DeviceDetectorModule.forRoot(),
    YoutubePlayerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  entryComponents: [PromoPopupComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
