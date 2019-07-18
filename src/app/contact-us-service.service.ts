import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})




export class ContactUsServiceService {

  private configUrl = "https://dev.b2c.api.kantoo.com/contactus"

  constructor(private http: HttpClient) {

  }

  postContactUsData(name:String,email:String,message:String,token:String):Observable<any>{
    var requestBody = {};
    requestBody['email'] = email;
    requestBody['name'] = name;
    requestBody['message'] = message;
    requestBody['token'] = token;
    return this.http.post(this.configUrl,requestBody,httpOptions)

  }
}
