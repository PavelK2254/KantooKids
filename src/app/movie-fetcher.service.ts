import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { MOVIES } from './moviesList'
import { FRANCHISES } from './franchiseList'
import { FRANCHISESMOBILE } from './franchiseListMobile'
import { PRODUCTS } from './productList'

@Injectable({
  providedIn: 'root'
})
export class MovieFetcherService {

  isMobile = false;



  constructor(deviceService: DeviceDetectorService) {
  this.isMobile =  deviceService.isMobile();
   }




  public getMovies(): Observable <Movie[]> {
      return of(MOVIES);
    }

  public getSingleMovie(id): Observable <Movie>{
      return of(MOVIES[id]);
  }

  public getFranchises(): Observable <Movie[]> {
    if(this.isMobile){
        return of(FRANCHISESMOBILE);
    }else{
        return of(FRANCHISES);
    }

      }

  public getProducts(): Observable <Movie[]>{
    return of(PRODUCTS);
  }
}
