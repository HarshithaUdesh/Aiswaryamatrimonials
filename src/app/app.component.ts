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

  constructor(public alertCtrl: AlertController,public router:Router,private remoteService : ServicesService) {
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
            this.router.navigate(['tabs']); 
            this.menuUpdated.next(true);
          },
        },
      ],
    });
    await alerts.present();
  }
}
