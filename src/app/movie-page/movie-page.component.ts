import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../movie';
import { MovieFetcherService } from "../movie-fetcher.service";
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  width = window.screen.width;
  height = window.screen.height * 0.8;
  youtubeID = "syrhiTl6FPg";
  assetPath = "./assets/moviePages/";
  dynamicAssetPath = "./assets/moviePages/";
  movie: Movie;
  currentMovieId:number;
  movieName: string;

  fold1Title: string;
  fold2Title: string;
  fold2TitleFriends: string;
  fold2Title2ndRow: string;
  fold2text:string;
  fold3Title:string;
  fold3Text:string;
  activeLanguage = "en";

  fold2Carousel: string[] = ["fold3_carousel_pic1","fold3_carousel_pic2","fold3_carousel_pic3","fold3_carousel_pic4"];
  fold3Carousel: string[] = ["fold4_carousel_pic1","fold4_carousel_pic2","fold4_carousel_pic3","fold4_carousel_pic4"];


  constructor( private route: ActivatedRoute,private translateLang:TranslateService,private router: Router,private movieFetcher : MovieFetcherService,private deviceService: DeviceDetectorService) {
    if(this.deviceService.isMobile()){
      console.log("movie mobile: " + this.deviceService.isMobile())
      this.dynamicAssetPath += "Mobile/"
    }
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

      document.getElementsByClassName('chooseMovie')[1].style.display = "block";
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
