import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kantoo-kids';
  deviceInfo = null;



  constructor(private deviceService: DeviceDetectorService, private loc: Location,private router: Router,private translate: TranslateService) {
    this.epicFunction();
    translate.setDefaultLang('en');
  }


  isViewMobile = false;

  ngOnInit() {
       this.router.events.subscribe((evt) => {
           if (!(evt instanceof NavigationEnd)) {
               return;
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
    console.log("Tablet: " +isTablet);  // returns if the device us a tablet (iPad etc)
    console.log("Desktop: " +isDesktopDevice); // returns if the app is running on a Desktop browser.
    if(isMobile){
      // this.loc.go("/m");
       this.isViewMobile = isMobile;
    }

  }

  isMobile():boolean{
    this.deviceInfo = this.deviceService.getDeviceInfo();
    return this.deviceService.isMobile();
  }
}
