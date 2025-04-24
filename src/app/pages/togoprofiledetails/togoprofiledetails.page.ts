import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { NavController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-togoprofiledetails',
  templateUrl: './togoprofiledetails.page.html',
  styleUrls: ['./togoprofiledetails.page.scss'],
  standalone: false,
})
export class TogoprofiledetailsPage implements OnInit {
userid : any;
userDetails:any;
  constructor( public router: Router, public service: ServicesService,public route: ActivatedRoute,public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
    this.route.queryParams.subscribe((params: any) => {
      this.userid = params["UserID"];
    
    });
   }

  ngOnInit() {

  }

ionViewDidEnter(){
this.getuserDetails()
}
  async getuserDetails(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    const apiUrl = this.service.Baseurl + "/Profile/GetProfileDetails";
    const req = {
      UserID: this.userid,
         CurrentUserID: localStorage.getItem('userid')
        }
    
      
    
    
  
    this.service.getPosts(apiUrl, req).subscribe(
      async (data) => {
        await loading.dismiss();
         if (data.success === true) {
          this.userDetails=data.data.profileData[0]
          console.log(this.userDetails)
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
  styleToast(toast: HTMLIonToastElement) {
    const toastElement = toast.shadowRoot?.querySelector('.toast-container');
    if (toastElement) {
      toastElement.setAttribute('style', 'background-color:#000; color: white; border-radius: 8px;');
    }
  }
  gotoback(){
    this.router.navigate(['tabs/home'])
  }
}
