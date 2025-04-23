import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { NavController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  showPassword:boolean= false;
  emailorphn: any;
  password: any;
  
  constructor(public router: Router, public service: ServicesService, public toastCtrl: ToastController,public loadingCtrl: LoadingController) { }
 
  ngOnInit() {
    console.log("check")
  }

async onLogin() {
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
    else if (!this.password) {
    const message =" Please enter the password";
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
    this.styleToast(toast);
    return;

  }else{
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    const loginapi = this.service.Baseurl + "/Auth/Login";
    const loginarray = {
      userName: this.emailorphn,
      password: this.password
    };
  
    this.service.getPosts(loginapi, loginarray).subscribe(
      async (data) => {
        await loading.dismiss();
        console.log(data.success,data)
        if (data.success === true) {
          const user = data.data.userData[0]; 
           localStorage.setItem("username", user.UserName);
          localStorage.setItem("userid", user.UserID.toString());
          localStorage.setItem("registerno", user.RegisterNo);
          localStorage.setItem("mobile", user.MobileNo);
          localStorage.setItem("email", user.EmailID);

          this.router.navigate(['tabs/home']);
          this.emailorphn = '';
          this.password = '';
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
}
gotoforgot(){
  this.router.navigate(['forgotpass']);
}

togosignup(){
  this.router.navigate(['register']);
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

}
