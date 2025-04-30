import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';


@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.page.html',
  styleUrls: ['./mydashboard.page.scss'],
  standalone: false,
})
export class MydashboardPage implements OnInit {
  profileCompletion: number = 3; 
  radius = 45;
  circumference = 2 * Math.PI * this.radius;
  progressOffset = 0;
  userId:any;
  profiledata:any;
  profiledataCount:any;
  activityList = [
    { icon: 'eye-outline', count: 6, label: 'Viewed You' },
    { icon: 'send-outline', count: 5, label: 'Request Sent' },
    { icon: 'mail-outline', count: 6, label: 'Request Received' },
    { icon: 'checkmark-done-outline', count: 1, label: 'Accepted Requests' },
    { icon: 'time-outline', count: 3, label: 'Pending Requests' }
  ];
  constructor(public location : Location,private sanitizer: DomSanitizer,public router: Router, public service: ServicesService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.userId=localStorage.getItem('userid')

   }
  
 
   backoption(){
    this.location.back();
  }
  ngOnInit() {
   
  }
  ionViewDidEnter() {
   this.getProfileDetailsData();
   this.getData();
   this.getDataProfilecount()
  }

  updateProgressRing() {
    this.progressOffset =
      this.circumference -
      (this.profileCompletion / 100) * this.circumference;
  }
 async getProfileDetailsData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    var userid = localStorage.getItem("userid");
    const planapi = this.service.Baseurl + "/Profile/GetProfileDetails";
    const planarray = {
      "UserID": userid 
    };
  
    this.service.getPosts(planapi, planarray).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          this.profiledata = data.data.profileData[0];
          console.log(this.profiledata,"this.profiledatathis.profiledata");
          
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

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    var userid = localStorage.getItem("userid");
    const planapi = this.service.Baseurl + "/Profile/GetUserDashboard";
    const planarray = {
      "UserID": userid 
    };
  
    this.service.getPosts(planapi, planarray).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          this.profiledataCount = data.data.data[0];
          console.log(this.profiledataCount,"this.counttttt.profiledata");
          
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

  async getDataProfilecount() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    var userid = localStorage.getItem("userid");
    const planapi = this.service.Baseurl + "/Profile/GetUserProfileCompletionPercentage";
    const planarray = {
      "UserID": userid 
    };
  
    this.service.getPosts(planapi, planarray).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          this.profileCompletion=data.data.completionPercentage
         this.updateProgressRing()
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
navToprofile(){
  this.router.navigate(['profile'])
}
}
