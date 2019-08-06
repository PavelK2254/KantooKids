import { Component,HostBinding,HostListener } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MovieFetcherService } from './movie-fetcher.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kantoo-kids';
  deviceInfo = null;



  constructor(private movieService: MovieFetcherService, private deviceService: DeviceDetectorService, private loc: Location, private router: Router, private translate: TranslateService) {
    this.epicFunction();
    if (localStorage.getItem("lang") != undefined) {
      translate.setDefaultLang(localStorage.getItem("lang"));
    } else {
      translate.setDefaultLang('en');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      console.log('RESIZE!!!');
    if (event.target.innerWidth < 769) {
      this.isViewMobile = true;
    } else {
      this.isViewMobile = false;
    }
  }


  isViewMobile = false;

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        /*  (<any>window).ga('set', 'page', "/" + this.movieService.getMovieNameById(event.urlAfterRedirects));
          console.log("sent " + this.movieService.getMovieNameById(event.urlAfterRedirects));
          (<any>window).ga('send', 'pageview');*/

      }
      window.scrollTo(0, 0)
    });


  }

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log("Mobile: " + isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log("Tablet: " + isTablet);  // returns if the device us a tablet (iPad etc)
    console.log("Desktop: " + isDesktopDevice); // returns if the app is running on a Desktop browser.
    if (isMobile) {
      // this.loc.go("/m");
      this.isViewMobile = isMobile;
    }

  }

  isMobile(): boolean {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    return this.deviceService.isMobile();
  }


}
