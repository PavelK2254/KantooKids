import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  width = window.screen.width;
  height = window.screen.height * 0.8;

  constructor( private route: ActivatedRoute,private location: Location) { }

  ngOnInit() {
  }

}
