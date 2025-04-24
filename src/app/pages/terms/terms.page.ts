import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(public location : Location) { }

  ngOnInit() {
  }
  backoption(){
    this.location.back();
  }

}
