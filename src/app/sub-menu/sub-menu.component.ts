import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieFetcherService } from "../movie-fetcher.service";

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {

  imgSrcLeft: string;
  imgSrcRight: string;
  movies: Movie[];


  constructor(private movieFetcher : MovieFetcherService) {
     this.imgSrcLeft = "assets/menu/arrow_left.png";
     this.imgSrcRight = "assets/menu/arrow_right.png";
   }

   getMovies(): void {
     this.movieFetcher.getMovies().subscribe(
       movies => this.movies = movies);
       console.log('movies: ', this.movies);
   }

  ngOnInit() {
    this.getMovies();
  }

}
