import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public location : Location) { }

  ngOnInit() {
  }
  backoption(){
    this.location.back();
  }

}
