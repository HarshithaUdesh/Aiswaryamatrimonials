import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
  standalone: false,
})
export class SubscriptionPage implements OnInit {

  subslist:any;
  myplanlist:any;
  subshistorylist:any;
  selectedOption = 'subscription';

  constructor(public location : Location,public router: Router, public service: ServicesService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  backoption(){
    this.location.back();
  }

  ionViewDidEnter() {
    this.getSubscriptionData();
    this.getMyPlanData();
    this.getMySubscriptionHistoryData();
  }

  async getSubscriptionData() {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      await loading.present();
    
      const subsapi = this.service.Baseurl + "/SchemaMaster/GetSchemaMasterSummary";
      const subsarray = {
        
      };
    
      this.service.getPosts(subsapi, subsarray).subscribe(
        async (data) => {
          await loading.dismiss();
          if (data.success === true) {
            this.subslist = data.data.data;
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

  async getMyPlanData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    var userid = localStorage.getItem("userid");
    const planapi = this.service.Baseurl + "/Profile/GetUserCurrentPlan";
    const planarray = {
      "UserID": userid 
    };
  
    this.service.getPosts(planapi, planarray).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          this.myplanlist = data.data.data;
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

  segmentChanged(event: any) {
    this.selectedOption = event.detail.value;
  }

}
