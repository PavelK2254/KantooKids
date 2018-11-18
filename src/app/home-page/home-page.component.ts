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
      state('0', style({ transform:'translateX(-160px)'})),
      state('*', style({ transform:'{{moveOffset}}'}),{
        params: {moveOffset: 'translateX(-160px)'}
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


]
})
export class HomePageComponent implements OnInit {

  imageBaseUri = "./assets/homepage";

  addEnglishText = "add english to their story";
  welcomeToText = "Welcome to";
  ultimate = "The ultimate English learning experience loved by children."
  learnEnglish = "Learn English with your Favorite";
  movieWord = "movie";
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
  @HostBinding('@.disabled')
  public isDisabled = false;
  moveOffset = 'translateX( ' +this.translate + 'px)';
  moveOffsetAnim = 'translateX( ' +this.translate + 'px)';
  viewIndex = 0;
  maxOffsetIndex:number = -11;
  minOffsetIndex:number = 0;
  offsetModifier = 1650;
  offsetModifier2 = 620;
  viewIndex2 = 0;


  constructor(private movieFetcher : MovieFetcherService; public dialog: MatDialog) {
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
    }
    this.viewIndex -= 1;
    this.translate = this.offsetModifier;
    console.log("menu index at: " + this.viewIndex);
    this.translate = this.translate * this.viewIndex;
    this.moveOffset = 'translateX( ' +this.translate + 'px)';

 //   if((this.translate + this.offsetModifier) < 0 ){
    this.moveOffsetAnim = 'translateX( ' +(this.translate + this.offsetModifier) +'px)';
//   }else{
 //   this.moveOffsetAnim = 'translateX( 0px)';
//   }
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
    }
    this.viewIndex += 1;
    this.translate = this.offsetModifier;
    console.log("menu index at: " + this.viewIndex);
    this.translate = this.translate * this.viewIndex;
    this.moveOffset = 'translateX( ' +this.translate + 'px)';
   // if((this.translate + this.offsetModifier) > 0 ){
    this.moveOffsetAnim = 'translateX( ' +(this.translate - this.offsetModifier) + 'px)';
//   }else{
 //   this.moveOffsetAnim = 'translateX(0px)';
   //}

    console.log("menu translae at: " + this.translate);
    console.log("offset translae at: " + this.moveOffset);
    console.log("offsetAnim translae at: " + this.moveOffsetAnim);
  }

  incrementIndex2(){

    if(this.viewIndex2 <= this.maxOffsetIndex ){
      this.isDisabled = true;
      return;
    }else{
      this.isDisabled = false;
    }
    this.viewIndex2 -= 1;
    this.translate = this.offsetModifier2;
    console.log("menu index at: " + this.viewIndex2);
    this.translate = this.translate * this.viewIndex2;
    this.moveOffset = 'translateX( ' +this.translate + 'px)';

 //   if((this.translate + this.offsetModifier) < 0 ){
    this.moveOffsetAnim = 'translateX( ' +(this.translate + this.offsetModifier2) +'px)';
//   }else{
 //   this.moveOffsetAnim = 'translateX( 0px)';
//   }
    console.log("menu translae at: " + this.translate);
    console.log("offset translae at: " + this.offsetModifier2);
    console.log("offsetAnim translae at: " + this.moveOffsetAnim);

  }
  decrementIndex2(){

    if(this.viewIndex2 >= this.minOffsetIndex ){
      this.isDisabled = true;
      return;
    }else{
      this.isDisabled = false;
    }
    this.viewIndex2 += 1;
    this.translate = this.offsetModifier2;
    console.log("menu index at: " + this.viewIndex);
    this.translate = this.translate * this.viewIndex;
    this.moveOffset = 'translateX( ' +this.translate + 'px)';
   // if((this.translate + this.offsetModifier) > 0 ){
    this.moveOffsetAnim = 'translateX( ' +(this.translate - this.offsetModifier2) + 'px)';
//   }else{
 //   this.moveOffsetAnim = 'translateX(0px)';
//   }

    console.log("menu translae at: " + this.translate);
    console.log("offset translae at: " + this.offsetModifier2);
    console.log("offsetAnim translae at: " + this.moveOffsetAnim);
  }

  getProducts(){
    this.movieFetcher.getProducts().subscribe(
      products => this.products = products);
      console.log('products: ', this.products);
  }

}
