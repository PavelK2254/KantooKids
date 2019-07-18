import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpHeaders,HttpClientModule } from '@angular/common/http';
import { ContactUsServiceService } from '../contact-us-service.service'

declare var grecaptcha: any;
declare global {
    interface Window { onSubmitMe: any; }
    interface Window { executeCaptcha: any; }
    interface Window { postContactMessage: any; }
    interface Window { contactUsService: any; }
    interface Window { deliverResult: any; }
};



@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  GetInTouch: "Get in Touch";
  isFailed = false;

  constructor(public dialog: MatDialog,public contactUsService:ContactUsServiceService) {
    window.contactUsService = this.contactUsService;
   }

public postContactMessage(name:String,email:String,message:String,token:String):void{
     window.contactUsService.postContactUsData(name,email,message,token)
     .subscribe(
       res => this.deliverResult(res)
     )
   }

   deliverResult(res){
     var isEmailDelivered = res.isEmailSent

   }

  onSubmitMe(name:String,email:String,message:String,token:String):void {
    //alert('Ready to submit to server');
    console.log("Token: " + token)
      window.postContactMessage(name,email,message,token)
     }



  executeCaptcha():void{
    var fullName = (<HTMLInputElement>document.getElementById('name')).value;
    var email = (<HTMLInputElement>document.getElementById('email')).value;
    var message = (<HTMLInputElement>document.getElementById('message')).value;
    console.log("captacha clicked " + fullName + email + message);
    let inputList = document.getElementsByClassName('ContactUs');
    //for(let input of inputList){
      for(var i = 0; i < inputList.length; i++){
    //if(input.value.trim() == ""){
    if((<HTMLInputElement>inputList[i]).value.trim() == ""){
      return;
      }
    }
    grecaptcha.execute('6LdNO54UAAAAAKvUgjEfp6BcegqZGDEyyFkaE2ct', {action: 'homepage'}).then(function(token) {
        window.onSubmitMe(fullName,email,message,token);
     });

  }

  ngOnInit() {
    console.log("contactus init");
    window.onSubmitMe = this.onSubmitMe;
    window.executeCaptcha = this.executeCaptcha;
    window.postContactMessage = this.postContactMessage;
    window.deliverResult = this.deliverResult;
  }



}
