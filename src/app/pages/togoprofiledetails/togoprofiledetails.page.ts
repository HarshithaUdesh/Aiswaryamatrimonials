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
selectedOption = 'about';
imageCount:any=0;
parsedBase64Images: string[] = [];
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
    this.userDetails=''
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
          const base64Str = this.userDetails.Base64ProfileImages;
      const imageCount = (base64Str.match(/\/9j\//g) || []).length;
      console.log(imageCount,"imageCountimageCount");
      this.imageCount = imageCount>0?imageCount:this.userDetails.Profile_Image?1:0
      this.parsedBase64Images = this.getBase64Images();
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
  getBase64Images(): string[] {
    if (this.userDetails.Base64ProfileImages) {
      // Assuming multiple base64 images are separated by comma or some delimiter
      return this.userDetails.Base64ProfileImages
        .split(',')
        .map((base64:any) => `data:image/jpeg;base64,${base64.trim()}`);
    }
    return [];
  }

  hasMultipleImages(): boolean {
    return this.parsedBase64Images.length > 0;
  }
  styleToast(toast: HTMLIonToastElement) {
    const toastElement = toast.shadowRoot?.querySelector('.toast-container');
    if (toastElement) {
      toastElement.setAttribute('style', 'background-color:#000; color: white; border-radius: 8px;');
    }
  }
  gotoback(){
    
    this.router.navigate(['tabs/home'])
    this.userDetails=''
  }
  segmentChanged(event: any) {
    this.selectedOption = event.detail.value;
  }
}
