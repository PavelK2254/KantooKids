import { Component, OnInit,HostBinding, HostListener } from '@angular/core';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { PromoPopupComponent } from '../promo-popup/promo-popup.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-our-app',
  templateUrl: './our-app.component.html',
  styleUrls: ['./our-app.component.css']
})
export class OurAppComponent implements OnInit {

  activeLanguage = ""
  imageBaseUri = "./assets/ourApp/";
  homeImageBaseUri = "./assets/homepage/";
  mobilePrefix = ""
  bottomConversionOpacityValue = 0;
  topConversionOpacityValue = 1;
  isMobile = false;

  constructor(private translateLang:TranslateService,public dialog: MatDialog) {
    translateLang.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("laguage:" + event.lang);
      if(event.lang == "en"){
        this.activeLanguage = "";
      }else{
      this.activeLanguage = event.lang;
      }


    });


   }

  ngOnInit() {
    if( localStorage.getItem("lang") != undefined)
    {
      if(localStorage.getItem("lang") == "en"){
      this.activeLanguage = "";
      }else{
        this.activeLanguage = localStorage.getItem("lang")
      }

    }

    if (window.innerWidth <= 769) {
      this.mobilePrefix = "/Mobile/"
      this.isMobile = true;
    }
  }

  imageErrorHandler(event) {
    event.currentTarget.style.display = "none";
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    if (window.scrollY <= 1000) {
      var computedValue = window.scrollY / 1000;
      this.topConversionOpacityValue = 1 - computedValue;
    }else if(window.scrollY > 1000){
      this.topConversionOpacityValue = 0;
    }

  }

  openDialog(): void {
      const dialogRef = this.dialog.open(PromoPopupComponent, {
        width: 'fit-content',
        height: 'fit-content'

      });
    }
    public closeDialog() {
      this.dialog.closeAll();
    }

}
