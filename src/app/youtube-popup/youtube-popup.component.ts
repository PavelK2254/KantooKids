import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-youtube-popup',
  templateUrl: './youtube-popup.component.html',
  styleUrls: ['./youtube-popup.component.css']
})
export class YoutubePopupComponent implements OnInit {

  player: YT.Player;
  id: string = '5Q6esf_N-0s';
  width = window.screen.width * 0.7;
  height = window.screen.height * 0.7;
  isMobile = false;


  constructor(public dialog: MatDialog,) {


   }



  closePopUp(){
    this.dialog.closeAll();
  }

  ngOnInit() {
    if (window.innerWidth <= 769) {
      this.isMobile = true;
      this.width = window.screen.width * 0.9;
      this.height = window.screen.height / 2;
    }
  }

  runPlayer(){
    this.player.playVideo();
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
    this.runPlayer();
  }

  onStateChange(event) {
    console.log('player state', event.data);

  }

}
