import { Component, OnInit } from '@angular/core';
import { useAnimation,trigger,state,style,animate,transition} from '@angular/animations';

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

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

}
