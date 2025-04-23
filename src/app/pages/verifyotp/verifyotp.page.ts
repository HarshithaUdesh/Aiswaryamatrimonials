import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { NavController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.page.html',
  styleUrls: ['./verifyotp.page.scss'],
  standalone:false
})
export class VerifyotpPage implements OnInit  {
  emailorphn:any;
  otpone: any;
  otptwo: any;
  otpthree: any;
  otpfour: any;
  otp: any;
  localotp: any;
  timer: number = 600; 
  timerDisplay: string = this.formatTime(this.timer);
  resendTimer: any; 
  mobile:any;
  email:any;
  isResendDisabled: boolean = true;
  userid:any;
  constructor(public router: Router, public service: ServicesService, public toastCtrl: ToastController,public loadingCtrl: LoadingController) {

    this.mobile = localStorage.getItem("mobile");
    this.email = localStorage.getItem("email");
    this.userid = localStorage.getItem('userid');
    console.log(this.email,this.mobile)
   }


  ngOnInit() {
    // this.startTimer();
  }

  ionViewDidEnter(){
    this.startTimer();
  }

  ionViewWillLeave(){
    if (this.resendTimer) {
      clearInterval(this.resendTimer);
    }
  }


  startTimer() {
     this.resendTimer = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.timerDisplay = this.formatTime(this.timer);
      } else {
        clearInterval(this.resendTimer); 
        this.isResendDisabled = false; 
      }
    }, 1000); 
  }

 async onResend() {
   const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    const loginapi = this.service.Baseurl + "/User/ResendOTP ";
    const loginarray = {
      EmailIDorMobileNo:this.email,
    };
  
    this.service.getPosts(loginapi, loginarray).subscribe(
      async (data) => {
        await loading.dismiss();
        console.log(data.success,data)
        if (data.success === true) {
          this.isResendDisabled = true; 
    this.timer = 600; 
    this.startTimer();
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

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  onInput(event: any, inputIndex: number, nextElements: any[]): void {
    const inputElement = event.target as HTMLInputElement;
    const regex = /[^0-9]/g;
    let inputValue = inputElement.value.replace(regex, '');

    if (inputValue.length > 1) {
      let valueArray = inputValue.split('');
      let currentIndex = inputIndex - 1;
      valueArray.forEach((char, i) => {
        if (currentIndex < 4) {
          switch (currentIndex) {
            case 0:
              this.otpone = char;
              nextElements[currentIndex].value = char;
              break;
            case 1:
              this.otptwo = char;
              nextElements[currentIndex].value = char;
              break;
            case 2:
              this.otpthree = char;
              nextElements[currentIndex].value = char;
              break;
            case 3:
              this.otpfour = char;
              nextElements[currentIndex].value = char;
              break;
          }
          currentIndex++;
        }
      });

      if (currentIndex < 4) {
        nextElements[currentIndex].setFocus();
      }
     
      return;
    }

    switch (inputIndex) {
      case 1:
        this.otpone = inputValue;
        break;
      case 2:
        this.otptwo = inputValue;
        break;
      case 3:
        this.otpthree = inputValue;
        break;
      case 4:
        this.otpfour = inputValue;
        break;
    }

    if (inputValue.length === 1 && nextElements[inputIndex]) {
      nextElements[inputIndex].setFocus();
    }
  }

  next(event: any, nextElement: any, prevElement: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && inputElement.value === '' && prevElement) {
      prevElement.setFocus();
    } else if (inputElement.value !== '' && nextElement) {
      nextElement.setFocus();
    }
    this.otp = ("" + this.otpone + this.otptwo + this.otpthree + this.otpfour);
    if(this.otp.length==4){
      this.verifyotp()
    }      
    
  }
 async verifyotp(){
  const loading = await this.loadingCtrl.create({
    message: 'Please wait...',
  });
  await loading.present();
  this.otp = ("" + this.otpone + this.otptwo + this.otpthree + this.otpfour);
  const loginapi = this.service.Baseurl + "/User/ValidateOTP ";
  const loginarray = {
    OTP: this.otp,
   EmailID:this.email,
  };

  this.service.getPosts(loginapi, loginarray).subscribe(
    async (data) => {
      await loading.dismiss();
 
      if (data.success === true) {
        this.router.navigate(['changepassword']);
        // if(this.mobile != null  && this.email != null){
        //   this.router.navigate(['changepassword']);
        // }else{
        //   this.router.navigate(['resetpassword']);
        // }
        
      }
      else {
        this.otpone ='';
        this.otptwo = '';
         this.otpthree ='';
        this.otpfour = '';
        const toast = await this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        await toast.present();
        this.styleToast(toast);
      }
    },
    async (err) => {
      this.otpone ='';
      this.otptwo = '';
       this.otpthree ='';
      this.otpfour = '';
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
