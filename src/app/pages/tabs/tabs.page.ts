import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationExtras,
  ActivatedRoute,
  CanActivate
} from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone:false
})
export class TabsPage implements OnInit {
userType :any;
  constructor(public router:Router) { }

  ngOnInit() {
    this.userType = localStorage.getItem('userType')
  }
}  

   

