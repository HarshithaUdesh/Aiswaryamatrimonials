import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ServicesService } from '../../services/services.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  agreeToTerms:boolean = false;
  relationshipList: any[] = [];
  selectedRelationship: any = null;
  form:any= FormGroup;
  firstname:any;
  lastname:any;
  mobile:any;
  email:any

  constructor(private fb: FormBuilder,public router: Router, public service: ServicesService, public toastCtrl: ToastController,public loadingCtrl: LoadingController) {

  
   }
  ngOnInit() {
    this.getRelationshipTypes();
    
  }
  styleToast(toast: HTMLIonToastElement) {
    const toastElement = toast.shadowRoot?.querySelector('.toast-container');
    if (toastElement) {
      toastElement.setAttribute('style', 'background-color:#000; color: white; border-radius: 8px;');
    }
  }

  async getRelationshipTypes() {
    const apiUrl = this.service.Baseurl + "/Master/GetRelationshipStatuses"; 
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.service.getPosts(apiUrl, {}).subscribe(
      async (data) => {
        await loading.dismiss();
        console.log(data.success,data)
        if (data.success === true) {
          this.relationshipList =  data.data.data; 
          
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
  togoprivacy(){
    this.router.navigate(['privacy'])
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
    });
    await toast.present();
    this.styleToast(toast); 
  }
  async signup(): Promise<void>{
    const isPhone = /^[0-9]{10}$/.test(this.mobile);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  
  
    if (!this.selectedRelationship) {
      return this.showToast('Please select Relationship Type');
    }
  
    else if (!this.firstname ) {
      return this.showToast('Please enter a valid First Name ');
    }
  
    else if (!this.lastname ) {
      return this.showToast('Please enter a valid Last Name ');
    }
  
     else if (!this.email || !isEmail) {
      return this.showToast('Please enter a valid Email address');
    }
  
    else if (!this.mobile || !isPhone) {
      return this.showToast('Please enter a valid 10-digit Mobile Number');
    }
  
    else if (!this.agreeToTerms) {
      return this.showToast('Please agree to the Terms and Conditions');
    }
   else{
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    const apiurl = this.service.Baseurl + "/User/QuickRegistration ";
    const req =  {
      Relativestatus: this.selectedRelationship == null ? 0 : parseInt(this.selectedRelationship),
      FirstName: this.firstname,
      LastName: this.lastname,
      EmailID: this.email,
      MobileNo: this.mobile
}
  
    this.service.getPosts(apiurl, req).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          localStorage.setItem('email', data.data.emailID)
          localStorage.setItem('mobile',data.data.mobileNo)
          const toast = await this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          await toast.present();
          this.styleToast(toast);
          this.router.navigate(['verifyotp']);
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
gotologin(){
  this.router.navigate(['login']);
}

}
