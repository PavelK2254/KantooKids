import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie'

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {

  imgSrcLeft: string;
  imgSrcRight: string;

  constructor() {
     this.imgSrcLeft = "assets/menu/arrow_left.png";
     this.imgSrcRight = "assets/menu/arrow_right.png";
   }

  ngOnInit() {
  }

}
