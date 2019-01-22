import { Component, OnInit } from '@angular/core';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { PromoPopupComponent } from '../promo-popup/promo-popup.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-our-app',
  templateUrl: './our-app.component.html',
  styleUrls: ['./our-app.component.css']
})
export class OurAppComponent implements OnInit {

  activeLanguage = "en"
  imageBaseUri = "./assets/homepage/";
  constructor(private translateLang:TranslateService,public dialog: MatDialog) {
    translateLang.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("laguage:" + event.lang);
      this.activeLanguage = event.lang;
    });
   }

  ngOnInit() {
    if( localStorage.getItem("lang") != undefined)this.activeLanguage = localStorage.getItem("lang");
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
