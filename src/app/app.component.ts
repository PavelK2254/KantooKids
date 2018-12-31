import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kantoo-kids';
  deviceInfo = null;



  constructor(private deviceService: DeviceDetectorService, private loc: Location) {
    this.epicFunction();
  }

  isViewMobile = false;



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
}
