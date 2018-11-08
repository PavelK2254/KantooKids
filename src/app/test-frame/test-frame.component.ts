import { Component, OnInit } from '@angular/core';
import { PromoPopupComponent } from '../promo-popup/promo-popup.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';



@Component({
  selector: 'app-test-frame',
  templateUrl: './test-frame.component.html',
  styleUrls: ['./test-frame.component.css']
})

export class TestFrameComponent implements OnInit {



  constructor(public dialog: MatDialog) { }

  openDialog(): void {
      const dialogRef = this.dialog.open(PromoPopupComponent, {
        width: 'fit-content',
        height: 'fit-content'

      });
    }


    public closeDialog() {
     this.dialog.closeAll();
   }

  ngOnInit() {
    this.openDialog();

  }

}
