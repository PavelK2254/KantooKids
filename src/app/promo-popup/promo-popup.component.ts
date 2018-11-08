import { Component, OnInit } from '@angular/core';
import { MenuTextItem } from '../menuTextItem';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';



@Component({
  selector: 'app-promo-popup',
  templateUrl: './promo-popup.component.html',
  styleUrls: ['./promo-popup.component.css']
})
export class PromoPopupComponent implements OnInit {

  available: MenuTextItem = {
    engText: 'available now',
    prText: '',
    spText: ''
  };


  constructor(public dialog: MatDialog) { }

  closePopUp(){
    this.dialog.closeAll();
  }

  ngOnInit() {
  }

}
