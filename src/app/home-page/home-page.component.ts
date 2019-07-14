import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieFetcherService } from "../movie-fetcher.service";
import { HostBinding, HostListener } from '@angular/core';
import { YoutubePopupComponent } from '../youtube-popup/youtube-popup.component'
import { PromoPopupComponent } from '../promo-popup/promo-popup.component'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  host: { '(window:scroll)': 'onWindowScroll($event)' },
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
  translate: number = 0;
  translate2: number = 100;

  @HostBinding('@.disabled')
  public isDisabled = false;
  moveOffset = 'translateX( ' + this.translate + 'px)';
  moveOffsetAnim = 'translateX( ' + this.translate + 'px)';
  moveOffset2 = 'translateX( ' + this.translate + 'px)';
  moveOffsetAnim2 = 'translateX( ' + this.translate + 'px)';
  viewIndex = 0;
  viewIndexArr: number[] = [];
  maxOffsetIndex: number = 0;
  minOffsetIndex: number = 3;
  maxOffsetIndex2: number = -2;
  minOffsetIndex2: number = 1;
  offsetModifier = 725;
  offsetModifier2 = 607;
  viewIndex2 = 0;
  reachedEnd = false;
  mobilePrefix = "";
  mobileDivideValue = 1.20;
  activeLanguage = "en";
  conversionButtonUri;
  productsSource: string;
  productSourceCounter = 0;
  carouselMaxScrollValue = 0;
  bottomConversionOpacityValue = 0;
  topConversionOpacityValue = 1;
  videoBaseUrl = "https://kantoo-kids.s3-eu-west-1.amazonaws.com/assets/homepage/";
  isVideoPlaying = false;


  constructor(private movieFetcher: MovieFetcherService, public dialog: MatDialog, private translateLang: TranslateService) {
    this.imgSrcLeft = "assets/homepage/left_arrow.png";
    this.imgSrcRight = "assets/homepage/right_arrow.png";
    if (localStorage.getItem("lang") != undefined) this.activeLanguage = localStorage.getItem("lang");
    translateLang.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("language:" + event.lang);
      this.activeLanguage = event.lang;
      this.conversionButtonUri = this.imageBaseUri + this.activeLanguage + this.mobilePrefix + '/conversion_btn.png';
    });
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    if (window.scrollY <= 1000) {
      var computedValue = window.scrollY / 1000;
      this.topConversionOpacityValue = 1 - computedValue;
    }else if(window.scrollY > 1000){
      this.topConversionOpacityValue = 0;
    }

  }

  ngAfterViewInit() {


    for (var i = 0; i < document.getElementsByClassName('franchisesItem').length; i++) {
      this.viewIndexArr.push(this.maxOffsetIndex + i);
    }

    this.updateDotMenu(this.viewIndexArr.length - 1);
    this.initVideoPLayerEvents();
  }

  initVideoPLayerEvents(){
    var videoElement =  (<HTMLVideoElement>document.getElementById('promoVideo'))
    if(this.mobilePrefix.length > 1){

    }



    videoElement.onplaying = () => {
      this.isVideoPlaying = true;
      document.getElementById('fold1LeftOveray').style.display = "none";
      document.getElementById('playBtnCont').style.display = "none";
      videoElement.controls = true;
      if(this.mobilePrefix.length > 1){
        videoElement.webkitEnterFullScreen();
      }

    }
    videoElement.onpause = () => {
      this.isVideoPlaying = false;
      //videoElement.controls = true;
      document.getElementById('fold1LeftOveray').style.display = "grid";
    //  document.getElementById('playBtnCont').style.display = "block";
    }
  }

  openDialog(): void {
    if (this.mobilePrefix.length > 1) {
      if (this.getMobileOperatingSystem() == "Android") {
        location.href = "https://go.onelink.me/app/d29e2f84"
      } else if (this.getMobileOperatingSystem() == "iOS") {
        location.href = "https://itunes.apple.com/us/app/storytime-learn-english/id1359805410?l=iw&ls=1&mt=8"
      }
    } else {
      const dialogRef = this.dialog.open(PromoPopupComponent, {
        width: 'fit-content',
        height: 'fit-content'

      });
    }

  }

  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return "iOS";
    }

    return "unknown";
  }


  onCarouselScroll(event): void {
    console.log(event.target.scrollLeft);
    console.log("max " + this.carouselMaxScrollValue);
    const divides: Number[] = [];
    const indexAmouth = document.getElementsByClassName('franchisesItemCont').length;
    const divideValue = Math.floor(this.carouselMaxScrollValue / indexAmouth);
    this.carouselMaxScrollValue = document.getElementsByClassName('franchiseItemHolder')[0].scrollWidth - document.getElementsByClassName('franchiseItemHolder')[0].clientWidth
    divides.push(0)
    for (var i = 1; i < indexAmouth; i++) {
      divides.push(divideValue * i)
    }
    console.log('divides ' + divides);
    if(this.mobilePrefix.length > 0){
    this.updateDotMenu(indexAmouth - this.getItemIndex(divides, event.target.scrollLeft))
    }

  }



  getItemIndex(array, target): number {
    console.log("target " + target);
    for (let it of array) {
      let index = array.indexOf(it);
      if (target > it && target < array[index + 1]) {
        return index + 1;
      } else if (target < it && target > array[index - 1]) {
        return index;
      } else if (target <= 0) {
        return 0;
      }
    }
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
    /*const dialogRef = this.dialog.open(YoutubePopupComponent, {
      width: 'fit-content',
      height: 'fit-content',
      maxWidth: '90vw',
      id: '5Q6esf_N-0s'
    });*/
    var videoElement =  (<HTMLVideoElement>document.getElementById('promoVideo'))
    if(this.isVideoPlaying){
      videoElement.pause();
    }else{
      videoElement.play();
    }
  }





  getFranchises(): void {
    this.movieFetcher.getFranchises().subscribe(
      franchises => this.franchises = franchises);
    this.startProductListRotation();
  }

  setOffsetModifier(): void {
    console.log("setOffsetModifier");
    if (this.mobilePrefix == "")
      this.offsetModifier = (<HTMLImageElement>document.getElementsByClassName("franchisesItem")[0]).width;
  }

  ngOnInit() {

    if (window.scrollY >= 1000) {
      var computedValue = window.scrollY / 1000;
      this.topConversionOpacityValue = 1 - computedValue;
    }

    if (window.innerWidth <= 769) {
      this.offsetModifier = window.innerWidth * 1.09;
      this.offsetModifier2 = window.innerWidth * 0.9;
      this.mobilePrefix = "/Mobile/"

    } else if (window.innerWidth <= 1024) {
      //  this.offsetModifier = window.innerWidth / 1.333;
      this.maxOffsetIndex = -3;
      this.minOffsetIndex = 2;
    } else {
      this.mobilePrefix = ""
      this.maxOffsetIndex = -3;
      this.minOffsetIndex = 2;
    }
    this.conversionButtonUri = this.imageBaseUri + this.activeLanguage + this.mobilePrefix + '/conversion_btn.png';
    this.getFranchises();
    this.getProducts();

  }

  onResize(event) {
    //this.resetCarousel(0);
    if (event.target.innerWidth < 769) {
      this.offsetModifier = window.innerWidth * 1.09;
      this.offsetModifier2 = event.target.innerWidth * 0.9;
      this.mobilePrefix = "/Mobile/"

    } else if (window.innerWidth <= 1024) {
      this.offsetModifier = window.innerWidth / 1.333;


    } else {
      this.offsetModifier = (<HTMLImageElement>document.getElementsByClassName("franchisesItem")[0]).width;
      this.offsetModifier2 = 607;
      this.mobilePrefix = ""
    }

    //  this.getFranchises();
    this.getProducts();
  }

  updateDotMenu(changeIndex: number): void {
    for (var i = 0; i < document.getElementsByClassName('franchisesItem').length; i++) {
      (<HTMLImageElement>document.getElementsByClassName('franchisesItemDots')[i]).src = './assets/homepage/Mobile/dot_2.png';
    }
    var dotsLength = document.getElementsByClassName('franchisesItemDots').length;
    console.log("dots length: " + dotsLength + " currentIndex: " + changeIndex + " Result " + (dotsLength - changeIndex));
    if (changeIndex == undefined) {
      changeIndex = dotsLength;
    } else if (Number.isNaN(changeIndex)) {
      changeIndex = 0;
    }
    if (changeIndex < 0) {
      changeIndex = 0;
    } else if (changeIndex >= dotsLength) {
      changeIndex = dotsLength - 1;
    }
    (<HTMLImageElement>document.getElementsByClassName('franchisesItemDots')[(dotsLength - changeIndex) - 1]).src = './assets/homepage/Mobile/dot_1.png';
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
      //  this.isDisabled = true;
      //return;
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
      //  this.isDisabled = true;
      //return;
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
    this.productSourceCounter--;
    if (this.productSourceCounter < 0) this.productSourceCounter *= -1;
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
    this.productSourceCounter++;
    if (this.productSourceCounter < 0) this.productSourceCounter *= -1;
    this.productsSource = this.products[this.productSourceCounter].name;
  }


  getProducts() {
    this.movieFetcher.getProducts().subscribe(
      products => this.products = products);
    this.productsSource = this.products[this.productSourceCounter].name;
    console.log('products: ', this.products);


  }

  dotsClicked(itemNum){
    const baseItemWidth = (<HTMLImageElement>document.getElementsByClassName('franchisesItem')[0]).width;
    const itemsAmouth = document.getElementsByClassName('franchisesItem').length
    document.getElementsByClassName('franchiseItemHolder')[0].scrollLeft = baseItemWidth * itemNum
    this.updateDotMenu(itemsAmouth - itemNum -1);
    console.log("force scroll " + itemNum + " scroll size " + baseItemWidth * itemNum);
  }

}
