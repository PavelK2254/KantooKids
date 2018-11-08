import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  imageBaseUri = "./assets/homepage";
  addEnglishText = "add english to their story";
  welcomeToText = "Welcome to";
  ultimate = "The ultimate English learning experience loved by children."
  learnEnglish = "Learn English with your Favorite";
  fold1BackgroundZIndexActual = -1
  fold1BackgroundZIndex = 'z-index: ' + this.fold1BackgroundZIndexActual;
  fold1PlayerZIndexActual = -5;
  fold1PlayerZIndex = 'z-index: ' + this.fold1PlayerZIndexActual;
  constructor() { }

  runPlayer(){
    this.fold1PlayerZIndexActual = 5;
  }

  ngOnInit() {
  }

}
