import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { NavController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: false,
})
export class NotificationsPage implements OnInit {
userid:any;
viwersProfilenotifi:any []=[]
searchUser:any;
searchdata:any[]=[]

  constructor(public platform: Platform,public router: Router, public service: ServicesService, public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
  this.userid =localStorage.getItem('userid')
  }


  goback(){
    this.router.navigate(['tabs/home'])
  }
filteruser(){


  const query = this.searchUser.toLowerCase();
  this.viwersProfilenotifi = this.searchdata.filter((option:any) =>{
    const fullName = (option.FirstName + ' ' + option.LastName).toLowerCase();
  return  (
    option.FirstName.toLowerCase().includes(query) ||
 
        option.LastName.toLowerCase().includes(query) ||
        fullName.includes(query)
  );
  })
}

  styleToast(toast: HTMLIonToastElement) {
    const toastElement = toast.shadowRoot?.querySelector('.toast-container');
    if (toastElement) {
      toastElement.setAttribute('style', 'background-color:#000; color: white; border-radius: 8px;');
    }
  }
  ngOnInit() {
    this.getAllData()
  }
  async getAllData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    const apiUrl = this.service.Baseurl + "/User/GetUserInterestSummary";
    const req = {
      UserID: this.userid,
    };

    this.service.getPosts(apiUrl, req).subscribe(
      async (data) => {
        await loading.dismiss();
        console.log(data.success, data)
        if (data.success === true) {
          this.viwersProfilenotifi = data.data.data
          this.searchdata = data.data.data
        }
        else {
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
  async acceptAndReject(event: Event, userdata: any, status: any) {
    event.stopPropagation();
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    const apiUrl = this.service.Baseurl + "/User/UpdateAcceptOrRejectUserInterest";
    const req = {
      "UserID": userdata.UserID,
      "InterestedUserID": this.userid,
      "IsAccepted": status,
    };

    this.service.getPosts(apiUrl, req).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          this.getAllData()
        }
        else {
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


  togodetailspage(UserData: any) {
    var navigationExtras: NavigationExtras = {
      queryParams: {
        UserID: JSON.stringify(UserData.UserID)
      }
    };
    this.router.navigate(['togoprofiledetails'], navigationExtras)
  }
         
}
