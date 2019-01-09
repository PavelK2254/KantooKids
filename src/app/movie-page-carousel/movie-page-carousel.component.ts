import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-movie-page-carousel',
  templateUrl: './movie-page-carousel.component.html',
  styleUrls: ['./movie-page-carousel.component.css']
})
export class MoviePageCarouselComponent implements OnInit {

  @Input() franchises: string[];
  @Input() franchiseName: string;
  assetPath = "./assets/movie-pages/";
  dynamicAssetPath = "./assets/movie-pages/";
  moveCounter = 0;

  constructor() { }

  ngOnInit() {


  }

  getCarouselItemWidth():number{
    return document.getElementsByClassName('franchisesItem')[0].width;
  }

  moveToPosition(event):void{
    let id = event.target.id;
    this.moveCounter = this.getCarouselItemWidth() * -1 *id
    for (var i = 0; i < document.getElementsByClassName('franchisesItem').length; i++) {
      (<HTMLImageElement>document.getElementsByClassName('franchisesItemDots')[i]).src = './assets/homepage/Mobile/dot_2.png';
    }
    (<HTMLImageElement>document.getElementsByClassName('franchisesItemDots')[+id]).src = './assets/homepage/Mobile/dot_1.png';
  }



}
