import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../movie';
import { MovieFetcherService } from "../movie-fetcher.service";
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { PromoPopupComponent } from '../promo-popup/promo-popup.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { YoutubePopupComponent } from '../youtube-popup/youtube-popup.component'

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  width = window.screen.width;
  height = window.screen.height * 0.8;
  youtubeID = "syrhiTl6FPg";
  assetPath = "../assets/moviePages/";
  dynamicAssetPath = "../assets/moviePages/";
  movie: Movie;
  currentMovieId:number;
  movieName: string;
  videoPath = "https://kantoo-kids.s3-eu-west-1.amazonaws.com/assets/moviePages/"
  fold1Title: string;
  fold2Title: string;
  fold2TitleFriends: string;
  fold2Title2ndRow: string;
  fold2text:string;
  fold3Title:string;
  fold3Text:string;
  activeLanguage = "en";
  conversionButtonUri: string;
  imageBaseUri = "../assets/homepage/";
  mobilePrefix = "";
  isMobile = false;
  fold2Carousel: string[] = ["fold3_carousel_pic1","fold3_carousel_pic2","fold3_carousel_pic3","fold3_carousel_pic4"];
  fold3Carousel: string[] = ["fold4_carousel_pic1","fold4_carousel_pic2","fold4_carousel_pic3","fold4_carousel_pic4"];


  constructor(public dialog: MatDialog, private route: ActivatedRoute,private translateLang:TranslateService,private router: Router,private movieFetcher : MovieFetcherService,private deviceService: DeviceDetectorService) {
      if (window.innerWidth <= 769) {
      console.log("movie mobile: " + this.deviceService.isMobile())
      this.dynamicAssetPath += "Mobile/"
      this.mobilePrefix = "Mobile/";
      this.isMobile = true;
    }
    this.conversionButtonUri = this.imageBaseUri + this.activeLanguage + '/' + this.mobilePrefix +'/conversion_btn.png';
    if( localStorage.getItem("lang") != undefined)this.activeLanguage = localStorage.getItem("lang");
    translateLang.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("laguage:" + event.lang);
      this.activeLanguage = event.lang;
    this.loadMovieContent(this.currentMovieId,this.activeLanguage);
    });
   }

  ngOnInit() {
    this.currentMovieId = +this.route.snapshot.paramMap.get('id')
  this.loadMovieContent(this.currentMovieId,this.activeLanguage);
    this.router.events.subscribe((event) => {
          (<HTMLImageElement>document.getElementsByClassName('logoImg')[0]).style.display = "initial";
          this.currentMovieId = +this.route.snapshot.paramMap.get('id')
        this.loadMovieContent(this.currentMovieId,this.activeLanguage);
      });

      if((<HTMLElement>document.getElementsByClassName('chooseMovie')[1]) != undefined){
      (<HTMLElement>document.getElementsByClassName('chooseMovie')[1]).style.display = "block";
    }
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(PromoPopupComponent, {
        width: 'fit-content',
        height: 'fit-content'

      });
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

  loadMovieContent(id,lang):void {
    if(id != undefined){
    console.log("cerrent ID: " + id)
    this.movieFetcher.getSingleMovie(id,lang).subscribe(
      movie => this.movie = movie);
      this.movieName = this.movie.name;
      this.fold1Title = this.movie.fold1Title.eng
      this.fold2Title = this.movie.fold2Title.eng.your
      this.fold2TitleFriends = this.movie.fold2Title.eng.friends
      this.fold2Title2ndRow = this.movie.fold2Title.eng.willTeach
      this.fold2text = this.movie.fold2Text.eng
      this.fold3Title = this.movie.fold3Title.eng
      this.fold3Text = this.movie.fold3Text.eng

    }
  }

  imageErrorHandler(event){
    event.currentTarget.style.display = "none";
  }

}
