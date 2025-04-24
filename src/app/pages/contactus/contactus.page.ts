import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(public location : Location,public toastCtrl:ToastController) { }

  ngOnInit() {
  }

  backoption(){
    this.location.back();
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    const toast =  this.toastCtrl.create({
      message: "Copied!",
      duration: 3000
    }).then((toast: HTMLIonToastElement) => {
      toast.present();
      const toastElement = toast.shadowRoot?.querySelector('.toast-container');
      if (toastElement) {
        toastElement.setAttribute('style', 'background-color:#000; color: white; border-radius: 8px;');
      }
    });
  
  }

}
