import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { MOVIES,MOVIES_PT,MOVIES_ES } from './moviesList'
import { FRANCHISES } from './franchiseList'
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

  public getSingleMovie(id,lang): Observable <Movie>{
    if(lang == "pt"){
      return of(MOVIES_PT[id]);
    }else if(lang == "es"){
      return of(MOVIES_ES[id]);
    }else{
      return of(MOVIES[id]);
    }

  }

  public getMovieNameById(id): String{
    var currentID = id.replace("/","");
    currentID = + currentID;
    if(MOVIES[currentID] == undefined){
      return id;
    }else{
    return MOVIES[currentID].name;
    }

  }

  public getFranchises(): Observable <Movie[]> {
    return of(FRANCHISES);
      }

  public getProducts(): Observable <Movie[]>{
    return of(PRODUCTS);
  }
}
