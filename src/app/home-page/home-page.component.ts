import { Component, OnInit, AfterViewInit } from '@angular/core';
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
      //  animate('0.5s ease-out')
      ]),
      transition(':decrement',[
        style({transform: '{{moveOffsetAnim2}}'}/*,{
          params: {moveOffsetAnim: 'translateX(300px)'}
        }*/),
    //    animate('0.5s ease-out')
      ])
    ])


]
})
export class HomePageComponent implements OnInit,AfterViewInit  {

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
  viewIndexArr: number[] = [];
  maxOffsetIndex:number = -6;
  minOffsetIndex:number = 5;
  maxOffsetIndex2:number = -2;
  minOffsetIndex2:number = 1;
  offsetModifier = 1158;
  offsetModifier2 = 607;
  viewIndex2 = 0;
  reachedEnd = false;
  isMobile = false;


  constructor(private movieFetcher : MovieFetcherService, public dialog: MatDialog) {
    this.imgSrcLeft = "assets/homepage/left_arrow.png";
    this.imgSrcRight = "assets/homepage/right_arrow.png";
   }




   startProductListRotation(): void {
    setInterval(() => {

      this.reachedEnd ?  this.decrementIndex2() : this.incrementIndex2()
    } ,3000);
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
    //  this.startProductListRotation();
  }

  ngOnInit() {
    this.getFranchises();
    this.getProducts();
    if(window.innerWidth < 600){
      this.offsetModifier = window.innerWidth*0.9;
      this.isMobile = true;
    }
  }

  updateDotMenu(changeIndex:number):void{
    for(var i = 0; i < document.getElementsByClassName('franchisesItem').length ; i++){
      (<HTMLImageElement>document.getElementsByClassName('franchisesItemDots')[i]).src = './assets/homepage/Mobile/dot_2.png';
    }
      (<HTMLImageElement>document.getElementsByClassName('franchisesItemDots')[changeIndex]).src = './assets/homepage/Mobile/dot_1.png';
  }

   ngAfterViewInit(){
     for(var i = 0; i < document.getElementsByClassName('franchisesItem').length ; i++){
       this.viewIndexArr.push(this.maxOffsetIndex + i);
     }
     this.updateDotMenu(this.viewIndexArr.indexOf(this.viewIndex));
   }

  resetCarousel(x:number){
    if(x == 0){
      this.moveOffset = 'translateX( 0px)';
      this.moveOffsetAnim = 'translateX( 0px)';
    }
  }

  onResize(event){
    this.resetCarousel(0);
    if(event.target.innerWidth < 600){
      this.offsetModifier = event.target.innerWidth*0.9;
      this.isMobile = true;
    }else{
      this.offsetModifier = 1158;
      this.isMobile = false;
    }
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
    this.updateDotMenu(this.viewIndexArr.indexOf(this.viewIndex))
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

    this.updateDotMenu(this.viewIndexArr.indexOf(this.viewIndex))
    console.log("menu translae at: " + this.translate);
    console.log("offset translae at: " + this.moveOffset);
    console.log("offsetAnim translae at: " + this.moveOffsetAnim);
  }

  incrementIndex2(){

    if(this.viewIndex2 <= this.maxOffsetIndex2 ){
      this.isDisabled = true;
      this.reachedEnd = true;
      console.log("reached end: " + this.reachedEnd);
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


    this.moveOffsetAnim2 = 'translateX( ' +(this.translate2 + this.offsetModifier2) +'px)';

    console.log("menu translae at: " + this.translate);
    console.log("offset translae at: " + this.offsetModifier2);
    console.log("offsetAnim translae at: " + this.moveOffsetAnim);

  }
  decrementIndex2(){

    if(this.viewIndex2 >= this.minOffsetIndex2 ){
      this.isDisabled = true;
      this.reachedEnd = false;
      console.log("reached end: " + this.reachedEnd);
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

    this.moveOffsetAnim2 = 'translateX( ' +(this.translate2 - this.offsetModifier2) + 'px)';


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
