import { Component, OnInit } from '@angular/core';
import { useAnimation,trigger,state,style,animate,transition} from '@angular/animations';
import { MenuTextItem } from '../menuTextItem'

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css'],
  animations: [
    trigger('toggleMenu',[
      state('menuOpen',style({transform:'translateX(0px)'})),
      state('menuClosed',style({transform:'translateX(-100%)'})),
      transition('menuClosed <=> menuOpen',[
        animate('0.5s')
      ])
    ])
  ]
})
export class MobileMenuComponent implements OnInit {

  isMenuOpen = false;

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

  language: MenuTextItem = {
    engText: 'language',
    prText: '',
    spText: ''
  }

  menuAlpha=1;

  constructor() { }

  ngOnInit() {
    console.log("mobileMenu")
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  scroll = (): void => {
    this.menuAlpha = 1 - window.pageYOffset / 250;
    console.log(this.menuAlpha);
      //handle your scroll here
      //notice the 'odd' function assignment to a class field
      //this is used to be able to remove the event listener

    };

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

}
