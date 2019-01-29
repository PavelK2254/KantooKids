import { Component, OnInit } from '@angular/core';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

dstBaseUrl = "http://dst.kantoo.com";
activeLanguage = "en";
languageMod:string

termsExt = "/tos.html";
privacyExt = "/privacy.html"
aboutExt = "/about.html"


  constructor(private translateLang:TranslateService) {
    if( localStorage.getItem("lang") != undefined)this.activeLanguage = localStorage.getItem("lang");
    this.languageMod = "/help-pages-" + this.activeLanguage;
    translateLang.onLangChange.subscribe((event: LangChangeEvent) => {
      this.activeLanguage = event.lang;
      this.languageMod = "/help-pages-" + this.activeLanguage;
    });
  }

  ngOnInit() {
  }

  hrefSocial(source){
    if(source == "linkedin"){
      window.location.href = "https://www.linkedin.com/company/la-mark-vision-ltd./about/";
    }else if(source == "facebook"){
      window.location.href = "https://www.facebook.com/StorytimeDisney/"
    }else if(source == "twitter"){
      window.location.href = "https://twitter.com/DisneyKantoo"
    }
  }
}
