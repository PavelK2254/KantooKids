import { Component, OnInit } from '@angular/core';
import { MenuTextItem } from '../menuTextItem'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  terms: MenuTextItem = {
    engText: 'terms & conditions',
    prText: '',
    spText: ''
  };

  faq: MenuTextItem = {
    engText: 'faq',
    prText: '',
    spText: ''
  };

  privacy: MenuTextItem = {
    engText: 'privacy policy',
    prText: '',
    spText: ''
  };

  follow: MenuTextItem = {
    engText: 'follow us',
    prText: '',
    spText: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
