import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie'

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  movieUrl:string;
  movieName:string;
  // @Input() movie: Movie;
   @Input() set movie(movie: Movie){
     this.movieUrl = 'assets/movies/' + movie.name + '.png';
   }


  constructor() {
    
   }

  ngOnInit() {
  }

}
