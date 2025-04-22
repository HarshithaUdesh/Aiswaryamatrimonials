import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { NavController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
  standalone:false
})
export class ForgotpassPage implements OnInit {

showPassword:boolean= false;
  emailorphn: any;
  password: any;
  
  constructor(public router: Router, public service: ServicesService, public toastCtrl: ToastController,public loadingCtrl: LoadingController) { }
 
  ngOnInit() {
  }

async onSubmit() {
  const isNumber = /^[0-9]+$/.test(this.emailorphn);
  const isPhone = /^[0-9]{10}$/.test(this.emailorphn);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailorphn);

  if (!this.emailorphn || (!isPhone && !isEmail)) {
    const message = isNumber ? 'Please Enter Valid Mobile Number' : 'Please enter a valid Email address';
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
    this.styleToast(toast);
    return;
  }
   
  const loading = await this.loadingCtrl.create({
    message: 'Please wait...',
  });
  await loading.present();

  const loginapi = this.service.Baseurl + "/User/ValidateEmailOrMobile ";
  const loginarray = {
    EmailIDorMobileNo: this.emailorphn,
  };

  this.service.getPosts(loginapi, loginarray).subscribe(
    async (data) => {
      await loading.dismiss();
      console.log(data.success,data)
      if (data.success === true) {
        // const user = data.data.userData[0]; 
        localStorage.setItem("email",this.emailorphn)
        this.router.navigate(['verifyotp']);
        this.emailorphn = '';
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
togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  handlenav(){
    this.router.navigate(['register']);
  }
}
