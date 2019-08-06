import { Component, OnInit,AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit,AfterViewInit {

  showMenu: boolean = false;

  constructor(private translate: TranslateService) {

  }

  ngOnInit() {
    console.log("Menu init")

  }

  openLegacy(){
    window.open('http://www.kantoo.com/en/')
  }

  ngAfterViewInit(){
  document.getElementById('mobileMenuContent').style.top = (<HTMLElement>document.getElementsByClassName('mMainMenu')[0]).offsetHeight + "px";
    if(localStorage.getItem("lang") != undefined){
      var els = document.getElementsByClassName('lang');
      Array.prototype.forEach.call(els, function(el) {
      el.classList.remove("pressedLangButton");
  });
      switch(localStorage.getItem('lang')){
        case "pt": {
          document.getElementsByClassName("lang")[2].classList.add("pressedLangButton");
          break;
        }
        case "es": {
          document.getElementsByClassName("lang")[4].classList.add("pressedLangButton");
          break;
        }
        default: {
          document.getElementsByClassName("lang")[0].classList.add("pressedLangButton");
        }
      }
    }
  }

  switchLanguage(language: string,element) {
    this.translate.use(language);
    var els = document.getElementsByClassName('lang')
    Array.prototype.forEach.call(els, function(el) {
    el.classList.remove("pressedLangButton");
});
    element.classList.add("pressedLangButton");
    localStorage.setItem("lang",language)
  }

}
