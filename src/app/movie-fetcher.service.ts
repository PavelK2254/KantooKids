import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { MOVIES } from './moviesList'
import { FRANCHISES } from './franchiseList'
import { PRODUCTS } from './productList'

@Injectable({
  providedIn: 'root'
})
export class MovieFetcherService {

public getMovies(): Observable <Movie[]> {
    return of(MOVIES);
  }

public getFranchises(): Observable <Movie[]> {
      return of(FRANCHISES);
    }

public getProducts(): Observable <Movie[]>{
  return of(PRODUCTS);
}

  constructor() { }
}
