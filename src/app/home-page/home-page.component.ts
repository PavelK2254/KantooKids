import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieFetcherService } from "../movie-fetcher.service";
import {  HostBinding } from '@angular/core';
import { YoutubePopupComponent } from '../youtube-popup/youtube-popup.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { useAnimation,trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('move',[
      state('0', style({ transform:'translateX(0px)'})),
      state('*', style({ transform:'{{moveOffset}}'}),{
        params: {moveOffset: 'translateX(0px)'}
      }),

      transition(':increment',[
        style({transform: '{{moveOffsetAnim}}'}/*,{
          params: {moveOffsetAnim: 'translateX(-300px)'}
        }*/),
        animate('0.5s ease-out')
      ]),
      transition(':decrement',[
        style({transform: '{{moveOffsetAnim}}'}/*,{
          params: {moveOffsetAnim: 'translateX(300px)'}
        }*/),
        animate('0.5s ease-out')
      ])
    ]),
    trigger('move2',[
      state('0', style({ transform:'translateX(0px)'})),
      state('*', style({ transform:'{{moveOffset2}}'}),{
        params: {moveOffset2: 'translateX(0px)'}
      }),

      transition(':increment',[
        style({transform: '{{moveOffsetAnim2}}'}/*,{
          params: {moveOffsetAnim: 'translateX(-300px)'}
        }*/),
        animate('0.5s ease-out')
      ]),
      transition(':decrement',[
        style({transform: '{{moveOffsetAnim2}}'}/*,{
          params: {moveOffsetAnim: 'translateX(300px)'}
        }*/),
        animate('0.5s ease-out')
      ])
    ])


]
})
export class HomePageComponent implements OnInit {

  imageBaseUri = "./assets/homepage";

  addEnglishText = "add english to their story";
  welcomeToText = "Welcome to";
  ultimate = "The ultimate English learning experience loved by children."
  learnEnglish = "Learn English with your Favorite";
  movieWord = "movie!";
  playing = "Playing = Learning";
  ourLegacy = "Our legacy"
  imgSrcLeft: string;
  imgSrcRight: string;
  fold1BackgroundZIndexActual = -1
  fold1BackgroundZIndex = 'z-index: ' + this.fold1BackgroundZIndexActual;
  fold1PlayerZIndexActual = -5;
  fold1PlayerZIndex = 'z-index: ' + this.fold1PlayerZIndexActual;
  screenWidth = window.screen.width;
  screenHeight = window.screen.height;
  franchises: Movie[];
  products: Movie[];
  translate: number = 100;
  translate2: number = 100;
  @HostBinding('@.disabled')
  public isDisabled = false;
  moveOffset = 'translateX( ' +this.translate + 'px)';
  moveOffsetAnim = 'translateX( ' +this.translate + 'px)';
  moveOffset2 = 'translateX( ' +this.translate + 'px)';
  moveOffsetAnim2 = 'translateX( ' +this.translate + 'px)';
  viewIndex = 0;
  maxOffsetIndex:number = -6;
  minOffsetIndex:number = 5;
  maxOffsetIndex2:number = -2;
  minOffsetIndex2:number = 1;
  offsetModifier = 1158;
  offsetModifier2 = 607;
  viewIndex2 = 0;


  constructor(private movieFetcher : MovieFetcherService, public dialog: MatDialog) {
    this.imgSrcLeft = "assets/homepage/left_arrow.png";
    this.imgSrcRight = "assets/homepage/right_arrow.png";
   }


   openPlayer(): void {
       const dialogRef = this.dialog.open(YoutubePopupComponent, {
         width: 'fit-content',
         height: 'fit-content'

       });
     }

     public closeDialog() {
      this.dialog.closeAll();
    }



  getFranchises(): void {
    this.movieFetcher.getFranchises().subscribe(
      franchises => this.franchises = franchises);
      console.log('franchises: ', this.franchises);
  }

  ngOnInit() {
    this.getFranchises();
    this.getProducts();
  }



  incrementIndex(){

    if(this.viewIndex <= this.maxOffsetIndex ){
      this.isDisabled = true;
      return;
    }else{
      this.isDisabled = false;
      if(this.viewIndex == (this.maxOffsetIndex + 1)){
      document.getElementById('movie-leftArrow').style.visibility = "hidden"
      }else{
      document.getElementById('movie-leftArrow').style.visibility = "visible"
    }
    document.getElementById('movie-rightArrow').style.visibility = "visible"
    }
    this.viewIndex -= 1;
    this.translate = this.offsetModifier;
    console.log("menu index at: " + this.viewIndex);
    this.translate = this.translate * this.viewIndex;
    this.moveOffset = 'translateX( ' +this.translate + 'px)';


    this.moveOffsetAnim = 'translateX( ' +(this.translate + this.offsetModifier) +'px)';

    console.log("menu translae at: " + this.translate);
    console.log("offset translae at: " + this.moveOffset);
    console.log("offsetAnim translae at: " + this.moveOffsetAnim);

  }
  decrementIndex(){

    if(this.viewIndex >= this.minOffsetIndex ){
      this.isDisabled = true;
      return;
    }else{
      this.isDisabled = false;
      if(this.viewIndex == (this.minOffsetIndex -1)){
      document.getElementById('movie-rightArrow').style.visibility = "hidden"
      }
      document.getElementById('movie-leftArrow').style.visibility = "visible"
    }
    this.viewIndex += 1;
    this.translate = this.offsetModifier;
    console.log("menu index at: " + this.viewIndex);
    this.translate = this.translate * this.viewIndex;
    this.moveOffset = 'translateX( ' +this.translate + 'px)';

    this.moveOffsetAnim = 'translateX( ' +(this.translate - this.offsetModifier) + 'px)';


    console.log("menu translae at: " + this.translate);
    console.log("offset translae at: " + this.moveOffset);
    console.log("offsetAnim translae at: " + this.moveOffsetAnim);
  }

  incrementIndex2(){

    if(this.viewIndex2 <= this.maxOffsetIndex2 ){
      this.isDisabled = true;
      return;
    }else{
      if(this.viewIndex2 == (this.maxOffsetIndex2 +1)){
        document.getElementById('product-arrowLeft').style.visibility = "hidden"
      }
      document.getElementById('product-arrowRight').style.visibility = "visible"
      this.isDisabled = false;
    }
    this.viewIndex2 -= 1;
    this.translate2 = this.offsetModifier2;
    console.log("menu index at: " + this.viewIndex2);
    this.translate2 = this.translate2 * this.viewIndex2;
    this.moveOffset2 = 'translateX( ' +this.translate2 + 'px)';

 //   if((this.translate + this.offsetModifier) < 0 ){
    this.moveOffsetAnim2 = 'translateX( ' +(this.translate2 + this.offsetModifier2) +'px)';
//   }else{
 //   this.moveOffsetAnim = 'translateX( 0px)';
//   }
    console.log("menu translae at: " + this.translate);
    console.log("offset translae at: " + this.offsetModifier2);
    console.log("offsetAnim translae at: " + this.moveOffsetAnim);

  }
  decrementIndex2(){

    if(this.viewIndex2 >= this.minOffsetIndex2 ){
      this.isDisabled = true;
      return;
    }else{
      if(this.viewIndex2 == (this.minOffsetIndex2 -1)){
        document.getElementById('product-arrowRight').style.visibility = "hidden"
      }
      document.getElementById('product-arrowLeft').style.visibility = "visible"
      this.isDisabled = false;
    }
    this.viewIndex2 += 1;
    this.translate2 = this.offsetModifier2;
    console.log("menu index at: " + this.viewIndex2);
    this.translate2 = this.translate2 * this.viewIndex2;
    this.moveOffset2 = 'translateX( ' +this.translate2 + 'px)';
   // if((this.translate + this.offsetModifier) > 0 ){
    this.moveOffsetAnim2 = 'translateX( ' +(this.translate2 - this.offsetModifier2) + 'px)';
//   }else{
 //   this.moveOffsetAnim = 'translateX(0px)';
//   }

    console.log("menu translae at: " + this.translate2);
    console.log("offset translae at: " + this.offsetModifier2);
    console.log("offsetAnim translae at: " + this.moveOffsetAnim2);
  }

  getProducts(){
    this.movieFetcher.getProducts().subscribe(
      products => this.products = products);
      console.log('products: ', this.products);
  }

}
