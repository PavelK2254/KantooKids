import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-movie-page-carousel',
  templateUrl: './movie-page-carousel.component.html',
  styleUrls: ['./movie-page-carousel.component.css']
})
export class MoviePageCarouselComponent implements OnInit {

  @Input() franchises: string[];
  @Input() franchiseName: string;
  @Input() foldName: string;
  @Input() dynamicAssetPath : string;
  assetPath = "./assets/moviePages/";
  moveCounter = 0;


  constructor() { }

  ngOnInit() {
    console.log("movie carosel init")

  }

  getCarouselItemWidth():number{
    return (<HTMLImageElement>document.getElementsByClassName('franchisesItem')[0]).width;
  }

  moveToPosition(event):void{
    for (var i = 0; i < document.getElementsByClassName('franchisesItem').length; i++) {
      try{
      (<HTMLImageElement>document.getElementsByClassName(this.foldName)[0].getElementsByClassName('franchisesItemDots')[i]).src = './assets/homepage/Mobile/dot_2.png';
    }catch(e){

    }

    }
    event.target.src = './assets/homepage/Mobile/dot_1.png';
    let id = event.target.id;
      this.moveCounter = this.getCarouselItemWidth() * -1 *id
  }



}
