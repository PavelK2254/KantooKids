import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieFetcherService } from "../movie-fetcher.service";
import {  HostBinding } from '@angular/core';
import { useAnimation,trigger,state,style,animate,transition} from '@angular/animations';
import { transAnimation } from '../animations';




@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  animations: [
    trigger('move',[
      state('0', style({ transform:'translateX(0px)'})),
      state('*', style({ transform:'{{moveOffset}}'}),{
        params: {moveOffset: 'translateX(0px)'}
      }),

      transition(':increment',[
        style({transform: '{{moveOffsetAnim}}'}/*,{
          params: {moveOffsetAnim: 'translateX(-300px)'}
        }*/),
        animate('0.5s ease-out')
      ]),
      transition(':decrement',[
        style({transform: '{{moveOffsetAnim}}'}/*,{
          params: {moveOffsetAnim: 'translateX(300px)'}
        }*/),
        animate('0.5s ease-out')
      ])
    ]),


]
})
export class SubMenuComponent implements OnInit {

  imgSrcLeft: string;
  moveLeft = false;
  moveRight = false;
  imgSrcRight: string;
  translate: number = 100;
  @HostBinding('@.disabled')
  public isDisabled = false;
  moveOffset = 'translateX( ' +this.translate + 'px)';
  moveOffsetAnim = 'translateX( ' +this.translate + 'px)';
  viewIndex = 0;
  maxOffsetIndex:number = -5;
  minOffsetIndex:number = 2;
  offsetModifier = 110;
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


   incrementIndex(){

     if(this.viewIndex <= this.maxOffsetIndex ){
       this.isDisabled = true;
       return;
     }else{
       this.isDisabled = false;
     }
     this.viewIndex -= 1;
     this.translate = this.offsetModifier;
     console.log("menu index at: " + this.viewIndex);
     this.translate = this.translate * this.viewIndex;
     this.moveOffset = 'translateX( ' +this.translate + 'px)';

  //   if((this.translate + this.offsetModifier) < 0 ){
     this.moveOffsetAnim = 'translateX( ' +(this.translate + this.offsetModifier) +'px)';
//   }else{
  //   this.moveOffsetAnim = 'translateX( 0px)';
//   }
     console.log("menu translae at: " + this.translate);
     console.log("offset translae at: " + this.moveOffset);
     console.log("offsetAnim translae at: " + this.moveOffsetAnim);

   }
   decrementIndex(){

     if(this.viewIndex >= this.minOffsetIndex ){
       this.isDisabled = true;
       return;
     }else{
       this.isDisabled = false;
     }
     this.viewIndex += 1;
     this.translate = this.offsetModifier;
     console.log("menu index at: " + this.viewIndex);
     this.translate = this.translate * this.viewIndex;
     this.moveOffset = 'translateX( ' +this.translate + 'px)';
    // if((this.translate + this.offsetModifier) > 0 ){
     this.moveOffsetAnim = 'translateX( ' +(this.translate - this.offsetModifier) + 'px)';
//   }else{
  //   this.moveOffsetAnim = 'translateX(0px)';
//   }

     console.log("menu translae at: " + this.translate);
     console.log("offset translae at: " + this.moveOffset);
     console.log("offsetAnim translae at: " + this.moveOffsetAnim);
   }

  ngOnInit() {
    this.getMovies();
  }





}
