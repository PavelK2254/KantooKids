import { Component, OnInit } from '@angular/core';
import { MenuTextItem } from '../menuTextItem'
import { SubMenuComponent } from '../sub-menu/sub-menu.component'
import { Router,NavigationEnd,ActivatedRoute  } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  showMenu: boolean = false;

  ourAppLoc: MenuTextItem = {
    engText: 'our app',
    prText: '',
    spText: ''
  };

  learningDisneyLoc: MenuTextItem = {
    engText: 'learing with disney',
    prText: '',
    spText: ''
  };

  kantooBlogLoc: MenuTextItem = {
    engText: 'kantoo blog',
    prText: '',
    spText: ''
  };

  reviewsLoc: MenuTextItem = {
    engText: 'reviews',
    prText: '',
    spText: ''
  };

  legacyLoc: MenuTextItem = {
    engText: 'our legacy',
    prText: '',
    spText: ''
  };

  contactLoc: MenuTextItem = {
    engText: 'contact',
    prText: '',
    spText: ''
  };


  constructor(private router: Router,private location: Location,private route: ActivatedRoute,private translate: TranslateService) {

  }

  ngOnInit() {
    console.log("Menu init")

  }

  switchLanguage(language: string,event) {
    this.translate.use(language);
    var els = document.getElementsByClassName('lang')
    Array.prototype.forEach.call(els, function(el) {
    el.classList.remove("pressedLangButton");
});  
    event.target.classList.add("pressedLangButton");
  }

}
