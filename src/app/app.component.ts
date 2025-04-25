import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { register } from 'swiper/element/bundle';
register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  private menuUpdated = new Subject<any>();
  currentUsername:any;

  constructor(private toastCtrl: ToastController,public loadingCtrl:LoadingController,public alertCtrl: AlertController,public router:Router,private remoteService : ServicesService) {
    this.currentUsername = localStorage.getItem("username");
  }

  ngOnInit() {
    this.currentUsername = localStorage.getItem("username");
  }
  refreshMenuData() {
    this.currentUsername = localStorage.getItem("username");
    this.menuUpdated.next(true);
  }
  onMenuopen(event: any) {
    this.currentUsername = localStorage.getItem("username");
    this.menuUpdated.next(true);
  }

  openProfilePage(){
    this.router.navigate(['tabs/profile']);
  }

  openAboutPage(){
    this.router.navigate(['about']);
  }
  openContactPage(){
    this.router.navigate(['contactus']);
  }
  openPrivacyPage(){
    this.router.navigate(['privacy']);
  }
  openTermsPage(){
    this.router.navigate(['terms']);
  }
  async logout(){
    const alerts = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want to Logout ?',
      buttons: [
        {
          text: 'NO',
          role: 'No',
          cssClass: 'secondary',
          handler: (blah:any) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'YES',
          handler: async () => {
            localStorage.clear();
            localStorage.setItem("userlogout",'true')
            this.router.navigate(['login']); 
            this.menuUpdated.next(true);
          },
        },
      ],
    });
    await alerts.present();
  }

  async deleteAccount(){
    const alerts = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want to delete your account ?',
      buttons: [
        {
          text: 'NO',
          role: 'No',
          cssClass: 'secondary',
          handler: (blah:any) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'YES',
          handler: async () => {
         this.permantdeleteAccount() 
          },
        },
      ],
    });
    await alerts.present();
  }

  async permantdeleteAccount() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    var userid = localStorage.getItem("userid");
    const shapi = this.remoteService.Baseurl + "/Profile/DeleteAccount";
    const sharray = {
      "UserID": userid,
      "DeletedBy": userid
    };
  
    this.remoteService.getPosts(shapi, sharray).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          localStorage.clear();
          this.router.navigate(['login']);
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
