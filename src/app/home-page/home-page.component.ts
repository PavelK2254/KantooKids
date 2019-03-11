import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieFetcherService } from "../movie-fetcher.service";
import { HostBinding } from '@angular/core';
import { YoutubePopupComponent } from '../youtube-popup/youtube-popup.component'
import { PromoPopupComponent } from '../promo-popup/promo-popup.component'
import {  trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('move', [
      state('0', style({ transform: 'translateX(0px)' })),
      state('*', style({ transform: '{{moveOffset}}' }), {
        params: { moveOffset: 'translateX(0px)' }
      }),

      transition(':increment', [
        style({ transform: '{{moveOffsetAnim}}' }/*,{
          params: {moveOffsetAnim: 'translateX(-300px)'}
        }*/),
        animate('0.5s ease-out')
      ]),
      transition(':decrement', [
        style({ transform: '{{moveOffsetAnim}}' }/*,{
          params: {moveOffsetAnim: 'translateX(300px)'}
        }*/),
        animate('0.5s ease-out')
      ])
    ]),
    trigger('move2', [
      state('0', style({ transform: 'translateX(0px)' })),
      state('*', style({ transform: '{{moveOffset2}}' }), {
        params: { moveOffset2: 'translateX(0px)' }
      }),

      transition(':increment', [
        style({ transform: '{{moveOffsetAnim2}}' }/*,{
          params: {moveOffsetAnim: 'translateX(-300px)'}
        }*/),
        //  animate('0.5s ease-out')
      ]),
      transition(':decrement', [
        style({ transform: '{{moveOffsetAnim2}}' }/*,{
          params: {moveOffsetAnim: 'translateX(300px)'}
        }*/),
        //    animate('0.5s ease-out')
      ])
    ])


  ]
})
export class HomePageComponent implements OnInit, AfterViewInit {

  imageBaseUri = "./assets/homepage/";
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
  moveOffset = 'translateX( ' + this.translate + 'px)';
  moveOffsetAnim = 'translateX( ' + this.translate + 'px)';
  moveOffset2 = 'translateX( ' + this.translate + 'px)';
  moveOffsetAnim2 = 'translateX( ' + this.translate + 'px)';
  viewIndex = 0;
  viewIndexArr: number[] = [];
  maxOffsetIndex: number = -3;
  minOffsetIndex: number = 2;
  maxOffsetIndex2: number = -2;
  minOffsetIndex2: number = 1;
  offsetModifier = 1158;
  offsetModifier2 = 607;
  viewIndex2 = 0;
  reachedEnd = false;
  mobilePrefix = "";
  mobileDivideValue = 1.20;
  activeLanguage = "en";
  conversionButtonUri;
  productsSource:string;
  productSourceCounter = 0;



  constructor(private movieFetcher: MovieFetcherService, public dialog: MatDialog,private translateLang:TranslateService) {
    this.imgSrcLeft = "assets/homepage/left_arrow.png";
    this.imgSrcRight = "assets/homepage/right_arrow.png";
    if( localStorage.getItem("lang") != undefined)this.activeLanguage = localStorage.getItem("lang");
    translateLang.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("laguage:" + event.lang);
      this.activeLanguage = event.lang;
      this.conversionButtonUri = this.imageBaseUri + this.activeLanguage + this.mobilePrefix +'/conversion_btn.png';
    });
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(PromoPopupComponent, {
        width: 'fit-content',
        height: 'fit-content'

      });
    }
    public closeDialog() {
      this.dialog.closeAll();
    }

  startProductListRotation(): void {
    setInterval(() => {

      this.reachedEnd ? this.decrementIndex2() : this.incrementIndex2()
    }, 3000);
  }


  openPlayer(): void {
    const dialogRef = this.dialog.open(YoutubePopupComponent, {
      width: 'fit-content',
      height: 'fit-content',
      id: '5Q6esf_N-0s'
    });
  }





  getFranchises(): void {
    this.movieFetcher.getFranchises().subscribe(
      franchises => this.franchises = franchises);
    console.log('franchises: ', this.franchises);
    this.startProductListRotation();
  }

  ngOnInit() {

    if (window.innerWidth <= 769) {
      this.offsetModifier = window.innerWidth * 1.09;
      this.offsetModifier2 = window.innerWidth * 0.9;
      this.mobilePrefix = "/Mobile/"

    }else if(window.innerWidth <= 1024){
    this.offsetModifier = window.innerWidth / 1.333;

    }else{
      this.mobilePrefix = ""
    }
    this.conversionButtonUri = this.imageBaseUri + this.activeLanguage + this.mobilePrefix +'/conversion_btn.png';
    this.getFranchises();
    this.getProducts();

  }

  onResize(event) {
    this.resetCarousel(0);
    if (event.target.innerWidth < 769) {
      this.offsetModifier = window.innerWidth * 1.09;
      this.offsetModifier2 = event.target.innerWidth * 0.9;
      this.mobilePrefix = "/Mobile/"
      
    }else if(window.innerWidth <= 1024){
    this.offsetModifier = window.innerWidth / 1.333;


    } else {
      this.offsetModifier = 1158;
      this.offsetModifier2 = 607;
      this.mobilePrefix = ""
    }

    this.getFranchises();
    this.getProducts();
  }

  updateDotMenu(changeIndex: number): void {
    for (var i = 0; i < document.getElementsByClassName('franchisesItem').length; i++) {
      (<HTMLImageElement>document.getElementsByClassName('franchisesItemDots')[i]).src = './assets/homepage/Mobile/dot_2.png';
    }
    (<HTMLImageElement>document.getElementsByClassName('franchisesItemDots')[changeIndex]).src = './assets/homepage/Mobile/dot_1.png';
  }

  ngAfterViewInit() {


    for (var i = 0; i < document.getElementsByClassName('franchisesItem').length; i++) {
      this.viewIndexArr.push(this.maxOffsetIndex + i);
    }
    this.updateDotMenu(this.viewIndexArr.indexOf(this.viewIndex));
  }



  resetCarousel(x: number) {
    if (x == 0) {
      this.moveOffset = 'translateX( 0px)';
      this.moveOffsetAnim = 'translateX( 0px)';
      this.moveOffset2 = 'translateX( 0px)';
      this.moveOffsetAnim2 = 'translateX( 0px)';
    }
  }





  incrementIndex() {

    if (this.viewIndex <= this.maxOffsetIndex) {
      this.isDisabled = true;
      return;
    } else {
      this.isDisabled = false;
      if (this.viewIndex == (this.maxOffsetIndex + 1)) {
        document.getElementById('movie-leftArrow').style.visibility = "hidden"
      } else {
        document.getElementById('movie-leftArrow').style.visibility = "visible"
      }
      document.getElementById('movie-rightArrow').style.visibility = "visible"
    }
    this.viewIndex -= 1;
    this.translate = this.offsetModifier;
    console.log("menu index at: " + this.viewIndex);
    this.translate = this.translate * this.viewIndex;
    this.moveOffset = 'translateX( ' + this.translate + 'px)';


    this.moveOffsetAnim = 'translateX( ' + (this.translate + this.offsetModifier) + 'px)';
    this.updateDotMenu(this.viewIndexArr.indexOf(this.viewIndex))
  }
  decrementIndex() {

    if (this.viewIndex >= this.minOffsetIndex) {
      this.isDisabled = true;
      return;
    } else {
      this.isDisabled = false;
      if (this.viewIndex == (this.minOffsetIndex - 1)) {
        document.getElementById('movie-rightArrow').style.visibility = "hidden"
      }
      document.getElementById('movie-leftArrow').style.visibility = "visible"
    }
    this.viewIndex += 1;
    this.translate = this.offsetModifier;
    console.log("menu index at: " + this.viewIndex);
    this.translate = this.translate * this.viewIndex;
    this.moveOffset = 'translateX( ' + this.translate + 'px)';

    this.moveOffsetAnim = 'translateX( ' + (this.translate - this.offsetModifier) + 'px)';

    this.updateDotMenu(this.viewIndexArr.indexOf(this.viewIndex))
  }

  incrementIndex2() {

    if (this.viewIndex2 <= this.maxOffsetIndex2) {
      this.isDisabled = true;
      this.reachedEnd = true;
      return;
    } else {
      if (this.viewIndex2 == (this.maxOffsetIndex2 + 1)) {

        if (document.getElementById('product-arrowLeft') != null)
          document.getElementById('product-arrowLeft').style.visibility = "hidden"

      }

      this.isDisabled = false;
    }
    this.viewIndex2 -= 1;
    this.productSourceCounter --;
    if(this.productSourceCounter < 0)this.productSourceCounter *=  -1;
    this.productsSource = this.products[this.productSourceCounter].name;
  }
  decrementIndex2() {

    if (this.viewIndex2 >= this.minOffsetIndex2) {
      this.isDisabled = true;
      this.reachedEnd = false;
      return;
    } else {
      if (this.viewIndex2 == (this.minOffsetIndex2 - 1)) {

        if (document.getElementById('product-arrowRight') != null)
          document.getElementById('product-arrowRight').style.visibility = "hidden"


      }

      this.isDisabled = false;
    }
    this.viewIndex2 += 1;
    this.productSourceCounter ++;
    if(this.productSourceCounter < 0)this.productSourceCounter *=  -1;
    this.productsSource = this.products[this.productSourceCounter].name;
  }

  getProducts() {
    this.movieFetcher.getProducts().subscribe(
      products => this.products = products);
      this.productsSource = this.products[this.productSourceCounter].name;
    console.log('products: ', this.products);
  }

}
