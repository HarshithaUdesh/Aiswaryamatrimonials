import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  standalone: false,
  selector: 'app-subscriptionhistory',
  templateUrl: './subscriptionhistory.page.html',
  styleUrls: ['./subscriptionhistory.page.scss'],
})
export class SubscriptionhistoryPage implements OnInit {

  subshistorylist:any;

  constructor(public location : Location,public router: Router, public service: ServicesService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getMySubscriptionHistoryData();
  }
  backoption(){
    this.location.back();
  }

  async getMySubscriptionHistoryData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    var userid = localStorage.getItem("userid");
    const shapi = this.service.Baseurl + "/User/GetSubscriptionHistory";
    const sharray = {
      "UserID": userid 
    };
  
    this.service.getPosts(shapi, sharray).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          this.subshistorylist = data.data.data;
        } else {
          const toast = await this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          await toast.present();
          this.styleToast(toast);
        }
      },
      async (err) => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: "Poor Internet connection/ Network Not Available, pls try again..",
          duration: 3000
        });
        await toast.present();
        this.styleToast(toast);
      }
    );
  }

  styleToast(toast: HTMLIonToastElement) {
    const toastElement = toast.shadowRoot?.querySelector('.toast-container');
    if (toastElement) {
      toastElement.setAttribute('style', 'background-color:#000; color: white; border-radius: 8px;');
    }
  }

}
