import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
declare var grecaptcha: any;
declare global {
    interface Window { onSubmitMe: any; }
    interface Window { executeCaptcha: any; }
};



@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  GetInTouch: "Get in Touch";

  constructor(public dialog: MatDialog) {

   }



  onSubmitMe(token):void {
    alert('Ready to submit to server');
    console.log("Token: " + token)

     }



  executeCaptcha():void{
    console.log("captach clicked");
    let inputList = document.getElementsByClassName('ContactUs');
    //for(let input of inputList){
      for(var i = 0; i < inputList.length; i++){
    //if(input.value.trim() == ""){
    if((<HTMLInputElement>inputList[i]).value.trim() == ""){
      return;
      }
    }
    grecaptcha.execute('6LdNO54UAAAAAKvUgjEfp6BcegqZGDEyyFkaE2ct', {action: 'homepage'}).then(function(token) {
        window.onSubmitMe(token);
     });

  }

  ngOnInit() {
    console.log("contactus init");
    window.onSubmitMe = this.onSubmitMe;
    window.executeCaptcha = this.executeCaptcha;
  }



}
