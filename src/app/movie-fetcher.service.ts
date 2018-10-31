import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { MOVIES } from './moviesList'
@Injectable({
  providedIn: 'root'
})
export class MovieFetcherService {

public getMovies(): Observable <Movie[]> {
    return of(MOVIES);
  }

  constructor() { }
}
