import { Component, OnInit,ViewChild } from '@angular/core';
import { useAnimation,trigger,state,style,animate,transition,keyframes} from '@angular/animations';
import { MenuTextItem } from '../menuTextItem'
import { Movie } from '../movie';
import { MovieFetcherService } from "../movie-fetcher.service";
import { Router,NavigationEnd } from '@angular/router';
import {MatAccordion} from '@angular/material';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css'],
  animations: [
    trigger('toggleMenu',[
      state('menuOpen',style({transform:'translateX(0px)'})),
      state('menuClosed',style({transform:'translateX(-100%)'})),
      transition('menuClosed <=> menuOpen',[
        animate('0.5s')
      ])
    ]),
    trigger('iconFade',[
      state('menuOpen',style({display:'block'})),
      state('menuClosed',style({display:'block'})),
      transition('menuClosed <=> menuOpen',[
        animate('0.5s',keyframes([
          style({opacity:0}),
          style({opacity:1})
        ]))
      ])
    ])
  ]
})
export class MobileMenuComponent implements OnInit {

  isMenuOpen = false;
  isLearningExpanded = false;
  lastScrollYPosition = 0;
   @ViewChild(MatAccordion) accordion: MatAccordion;
   movies: Movie[];

  menuAlpha=0.9;

  constructor(private router: Router,private movieFetcher : MovieFetcherService,private translate: TranslateService) { }

  ngOnInit() {
    console.log("mobileMenu")
    if( localStorage.getItem("lang") != undefined){
      var els = document.getElementsByClassName('menuTextLang');
      Array.prototype.forEach.call(els, function(el) {
      el.classList.remove("menuTextLangPressed");
  });
      switch(localStorage.getItem('lang')){
        case "pt": {
          document.getElementsByClassName("menuTextLang")[2].classList.add("menuTextLangPressed");
          break;
        }
        case "es": {
          document.getElementsByClassName("menuTextLang")[4].classList.add("menuTextLangPressed");
          break;
        }
        default: {
          document.getElementsByClassName("menuTextLang")[0].classList.add("menuTextLangPressed");
        }
      }
    }
    window.addEventListener('scroll', this.scroll, true); //third parameter

    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.closeMenu();
        }
      });
    this.getMovies();
  }

  switchLanguage(language: string,event) {
    this.translate.use(language);
    var els = document.getElementsByClassName('menuTextLang')
    Array.prototype.forEach.call(els, function(el) {
    el.classList.remove("menuTextLangPressed");
});
    event.target.classList.add("menuTextLangPressed");
    localStorage.setItem("lang",language);
  }

  openLegacy(){
    window.open('http://www.kantoo.com/en/')
  }

  scroll = (): void => {
    //if(!this.isMenuOpen)
  //  this.menuAlpha = 0.9 - window.pageYOffset / 250;

      //handle your scroll here
      //notice the 'odd' function assignment to a class field
      //this is used to be able to remove the event listener

    };

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
    if(this.isMenuOpen){
      document.body.style.overflowY = "hidden"
      document.body.style.position = "fixed"
    }else{
      document.body.style.overflowY = "initial"
      document.body.style.position = "relative"
    }
    this.isMenuOpen? this.menuAlpha = 1 : this.menuAlpha = 0.9;
    document.getElementById("nav-icon3").classList.toggle("open");
    document.getElementById('mobileMenuContent').scrollTo(0, 0);
    this.accordion.closeAll();
  }

  getMovies(): void {
    this.movieFetcher.getMovies().subscribe(
      movies => this.movies = movies);
      console.log('movies: ', this.movies);
  }

  capitalize(name):string {
    return name.charAt(0).toUpperCase() + name.slice(1).replace("_"," ");
  }

closeMenu(){
  this.isMenuOpen = false;
  document.body.style.overflowY = "scroll"
  document.body.style.position = "relative"
  document.getElementById("nav-icon3").classList.remove('open');
  this.menuAlpha = 0.9;
  this.accordion.closeAll();

}

matOpened(){
  console.log('Learning opened');
  this.isLearningExpanded = true;


}

matClosed(){
  console.log('Learning closed');
  this.isLearningExpanded = false;


}

}
