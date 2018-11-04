import { Component, OnInit } from '@angular/core';
import { MenuTextItem } from '../menuTextItem'
import { SubMenuComponent } from '../sub-menu/sub-menu.component'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  showMenu: false;

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


  constructor() { }

  ngOnInit() {
  }

}
