import { Component, OnInit,HostBinding, HostListener}  from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PromoPopupComponent } from '../promo-popup/promo-popup.component'

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {

  bottomConversionOpacityValue = 0;
  imageBaseUri = "./assets/homepage/";
  mobilePrefix = "";

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (window.innerWidth <= 769) {
      this.mobilePrefix = "/Mobile/"
    }
  }


  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    if (window.scrollY <= 1000) {
      var computedValue = window.scrollY / 1000;
      this.bottomConversionOpacityValue = computedValue;
    }else if(window.scrollY > 1000){
      this.bottomConversionOpacityValue = 1;
    }
    if(this.bottomConversionOpacityValue == 0){
      (<HTMLElement>document.getElementsByClassName('conversionButtonBottom')[0]).style.display = "none"
    }else{
      (<HTMLElement>document.getElementsByClassName('conversionButtonBottom')[0]).style.display = "block"
    }
  }


  openDialog(): void {
    if (this.mobilePrefix.length > 1) {
      if (this.getMobileOperatingSystem() == "Android") {
        location.href = "https://go.onelink.me/app/d29e2f84"
      } else if (this.getMobileOperatingSystem() == "iOS") {
        location.href = "https://itunes.apple.com/us/app/storytime-learn-english/id1359805410?l=iw&ls=1&mt=8"
      }
    } else {
      const dialogRef = this.dialog.open(PromoPopupComponent, {
        width: 'fit-content',
        height: 'fit-content'

      });
    }
  }

  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return "iOS";
    }

    return "unknown";
  }

}
