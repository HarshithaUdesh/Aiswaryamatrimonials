import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  constructor(public location : Location) { }

  ngOnInit() {
  }
  backoption(){
    this.location.back();
  }

}
