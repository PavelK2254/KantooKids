import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { ContactUsServiceService } from '../contact-us-service.service'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

declare var grecaptcha: any;

declare global {
  interface Window { onSubmitMe: any; }
  interface Window { executeCaptcha: any; }
  interface Window { postContactMessage: any; }
  interface Window { contactUsService: any; }
  interface Window { deliverResult: any; }
  interface Window { isFailed: boolean; }
};



@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  GetInTouch: "Get in Touch";
  isFailed = true;
  grecaptcha: any;
  isHidden = "none";
  self: any;
  assetPath = "./assets/contactus/";
  currentLanguage:String;

  constructor(public dialog: MatDialog, public contactUsService: ContactUsServiceService, private translateLang: TranslateService) {
    window.contactUsService = this.contactUsService;
    if(localStorage.getItem('lang') != null){
      this.currentLanguage = localStorage.getItem('lang');
    }else{
      this.currentLanguage = "en";
    }
    this.self = this;
    translateLang.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  public postContactMessage(name: String, email: String, message: String, token: String, component: ContactusComponent): void {
    if(component != undefined){

      if(localStorage.getItem('lang') != undefined && localStorage.getItem('lang') != null) {
        this.currentLanguage = localStorage.getItem('lang');
      }else{
        this.currentLanguage = "en";
      }
      window.contactUsService.postContactUsData(name, email, message, token,this.currentLanguage)
        .subscribe(
          res => this.deliverResult(res, component)
        )
    }
  }

  deliverResult(res, component: ContactusComponent) {
    var isEmailDelivered = res.isEmailSent
    var confirmationPopup = (<HTMLDivElement>document.getElementsByClassName('confirmationMessage')[0]);
    var formElement = (<HTMLFormElement>document.getElementsByClassName('contactUsContainerInnerInput')[0]);
    if(res == undefined){
      component.isFailed = true;
    }
    try {
      component.isFailed = !isEmailDelivered;
    } catch (e) {
      component.isFailed = true;
    }


    formElement.style.visibility = "hidden";
    confirmationPopup.style.display = "block";
    (<HTMLInputElement>document.getElementById('name')).value = "";
    (<HTMLInputElement>document.getElementById('email')).value = "";
    (<HTMLTextAreaElement>document.getElementById('message')).value = "";
  }

  onSubmitMe(name: String, email: String, message: String, token: String, component: ContactusComponent): void {
    //alert('Ready to submit to server');
    console.log("Token: " + token)
    this.postContactMessage(name, email, message, token, component)
  }



  executeCaptcha(): void {
    var confirmationPopup = (<HTMLDivElement>document.getElementsByClassName('confirmationMessage')[0]);
    var formElement = (<HTMLFormElement>document.getElementsByClassName('contactUsContainerInnerInput')[0]);
    confirmationPopup.style.display = "none";
    formElement.style.visibility = "visible";
    var fullName = (<HTMLInputElement>document.getElementById('name')).value;
    var email = (<HTMLInputElement>document.getElementById('email')).value;
    var message = (<HTMLInputElement>document.getElementById('message')).value;
    var self = this;
    console.log("captacha clicked " + fullName + email + message);
    let inputList = document.getElementsByClassName('ContactUs');
    //for(let input of inputList){
    for (var i = 0; i < inputList.length; i++) {
      //if(input.value.trim() == ""){
      if ((<HTMLInputElement>inputList[i]).value.trim() == "") {
        return;
      }
    }
    grecaptcha.execute('6LdNO54UAAAAAKvUgjEfp6BcegqZGDEyyFkaE2ct', { action: 'homepage' }).then(function(token) {
      window.onSubmitMe(fullName, email, message, token, self);
    });

  }

  closeConfirmation(event) {
    var confirmationPopup = (<HTMLDivElement>document.getElementsByClassName('confirmationMessage')[0]);
    var formElement = (<HTMLFormElement>document.getElementsByClassName('contactUsContainerInnerInput')[0]);
    confirmationPopup.style.display = "none";
    formElement.style.visibility = "visible";
  }

  ngOnInit() {
    console.log("contactus init");
    window.onSubmitMe = this.onSubmitMe;
    window.executeCaptcha = this.executeCaptcha;
    window.postContactMessage = this.postContactMessage;
    window.deliverResult = this.deliverResult;
    window.isFailed = this.isFailed;
  }



}
