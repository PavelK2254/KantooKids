import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../movie';
import { MovieFetcherService } from "../movie-fetcher.service";

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  width = window.screen.width;
  height = window.screen.height * 0.8;
  assetPath = "./assets/movie-pages/";
  dynamicAssetPath = "./assets/movie-pages/";
  movie: Movie;
  currentMovieId:number;
  movieName: string;
  fold1Title: string;


  constructor( private route: ActivatedRoute,private location: Location,private router: Router,private movieFetcher : MovieFetcherService) { }

  ngOnInit() {
    this.currentMovieId = this.route.snapshot.paramMap.get('id')
  this.loadMovieContent(this.currentMovieId);
    this.router.events.subscribe((event) => {
          this.currentMovieId = this.route.snapshot.paramMap.get('id')
        this.loadMovieContent(this.currentMovieId);
      });
  }

  loadMovieContent(id):void {
    if(id != undefined){
    console.log("cerrent ID: " + id)
    this.movieFetcher.getSingleMovie(id).subscribe(
      movie => this.movie = movie);
      this.movieName = this.movie.name;
      this.fold1Title = this.movie.fold1Title.eng
      console.log("current movie: " + this.movie.name)
    }
  }

}
