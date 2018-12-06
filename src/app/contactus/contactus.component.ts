import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  GetInTouch: "Get in Touch";

  constructor() { }

  onSubmitMe(token):void {
    alert('Ready to submit to server');
     }

  executeCaptcha():void{
    let inputList: Array<Any> = document.getElementsByClassName('ContactUs');
    for(let input of inputList){
    if(input.value.trim() == ""){
      return;
      }
    }
    grecaptcha.execute();

  }

  ngOnInit() {
    console.log("contactus init");
    window.onSubmitMe = this.onSubmitMe;
    window.executeCaptcha = this.executeCaptcha;
  }



}
