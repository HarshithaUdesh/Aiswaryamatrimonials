import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { NavController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
  standalone:false
})
export class ChangepasswordPage implements OnInit {
  cshowPassword:boolean= false;

  password: any;
  cpassword:any
  passbarhide:boolean =false;
showPassword: boolean = false;
strengthLabel: string = '';
strengthColor: string = '#ccc';
strengthPercent: number = 0;
hasMinLength: boolean = false;
hasUpperCase: boolean = false;
hasNumber: boolean = false;
hasSpecialChar: boolean = false;
mobile:any;
email:any;
  constructor(public router: Router, public service: ServicesService, public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    this.mobile =localStorage.getItem('mobile')
    this.email = localStorage.getItem("email");
   }
 
  ngOnInit() {
  }

async onLogin() {
   const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!this.password) {
  const toast = await this.toastCtrl.create({
    message: 'Please enter the password',
    duration: 3000
  });
  await toast.present();
  this.styleToast(toast);
  return;
}

if (!passwordRegex.test(this.password)) {
  const toast = await this.toastCtrl.create({
    message: 'Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.',
    duration: 4000
  });
  await toast.present();
  this.styleToast(toast);
  return;
}
if (this.password !== this.cpassword) {
  const toast = await this.toastCtrl.create({
    message: 'Passwords do not match.',
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

  const loginapi = this.service.Baseurl + "/User/SetPassword ";
  const loginarray = {
     Password: this.password,
      ConfirmPassword: this.cpassword,
      EmailID: this.email,
      MobileNo: this.mobile 
    } 
  this.service.getPosts(loginapi, loginarray).subscribe(
    async (data) => {
      await loading.dismiss();
      console.log(data.success,data)
      if (data.success === true) {
        this.router.navigate(['login']);
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
  togglePasswordVisibilityC() {
    this.cshowPassword = !this.cshowPassword;
  }

checkPasswordStrength(event: any) {
  const value = event.detail.value;
  this.password = value;

  this.passbarhide = true; 

  let score = 0;

  this.hasMinLength = value.length >= 8;
  this.hasUpperCase = /[A-Z]/.test(value);
  this.hasNumber = /[0-9]/.test(value);
  this.hasSpecialChar = /[\W_]/.test(value);

  if (this.hasMinLength) score++;
  if (this.hasUpperCase) score++;
  if (this.hasNumber) score++;
  if (this.hasSpecialChar) score++;

  const strengthMap = [
    { label: 'Very weak', color: 'red', percent: 20 },
    { label: 'Weak', color: 'orange', percent: 40 },
    { label: 'Moderate', color: 'gold', percent: 60 },
    { label: 'Strong', color: 'blue', percent: 80 },
    { label: 'Very strong', color: 'green', percent: 100 },
  ];

  const level = strengthMap[Math.min(score, strengthMap.length - 1)];
  this.strengthLabel = level.label;
  this.strengthColor = level.color;
  this.strengthPercent = level.percent;
}
gotologin(){
  this.router.navigate(['login']);
}
}
