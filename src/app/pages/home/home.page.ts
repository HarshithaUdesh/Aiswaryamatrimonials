import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { NavController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  openModal:boolean=false;
  genderOptions: any[] = [];
  locationOptions: any[] = [];
  casteOptions: any[] = [];
  ageOptions: any[] = [];
  partnerOptions: any[] = [];
  interestedProfile: any[] = [];
  viwersProfile: any[] = [];
  Searcheddata:boolean = false;
  requesteddata:boolean = true;
  recentdata:boolean = false;
  activeButton: string = '2';
  nodatafound :boolean = true;
  filter = {
    partner:'',
    Gender: '',
    Location: '',
    CasteOrCommunity: '',
    MaxAge: '',
    MinAge:''
  };
  minAgeList: number[] = [];
  maxAgeList: number[] = [];
  userid: any;
  minAge: number | undefined;
  maxAge: number | undefined;
  profiles: any[] = []

  constructor(public platform: Platform,public router: Router, public service: ServicesService, public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    this.userid = localStorage.getItem('userid');

    this.platform.backButton.subscribeWithPriority(0, async () => {
      const currentRoute = this.router.url;

      if (currentRoute === '/tabs/home') {
        const confirmation = window.confirm("Do you want to exit the app?");
        if (confirmation) {
          (navigator as any).app.exitApp();
        } else {
        }
      } else {
        window.history.back();
      }
    });
  }

  ngOnInit() {
   
   
  }
  ionViewDidEnter(){
    this.loadFilterOptions();
    this.getAllLocation()
    this.getAllcast()
    this.getUserRecentProfies()
    this.getUserInterestProfies()

  }

  handleModel(){
    this.openModal=true;
  }
  closemodal(){
    this.openModal=false;
  }



  styleToast(toast: HTMLIonToastElement) {
    const toastElement = toast.shadowRoot?.querySelector('.toast-container');
    if (toastElement) {
      toastElement.setAttribute('style', 'background-color:#000; color: white; border-radius: 8px;');
    }
  }

async  getUserInterestProfies(){
  const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      await loading.present();
    
      const apiUrl = this.service.Baseurl + "/User/GetUserInterestSummary";
      const req = {
        UserID:this.userid,
      };
    
      this.service.getPosts(apiUrl, req).subscribe(
        async (data) => {
          await loading.dismiss();
          console.log(data.success,data)
          if (data.success === true) {
           this.interestedProfile = data.data.data
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



  async  getUserRecentProfies(){
    const loading = await this.loadingCtrl.create({
          message: 'Please wait...',
        });
        await loading.present();
      
        const apiUrl = this.service.Baseurl + "/Profile/GetProfileViewers";
        const req = {
          UserID:this.userid,
        };
      
        this.service.getPosts(apiUrl, req).subscribe(
          async (data) => {
            await loading.dismiss();
            console.log(data.success,data)
            if (data.success === true) {
             this.viwersProfile = data.data.data
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

  async getAllLocation(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    
    const apiUrl = this.service.Baseurl + "/Master/GetAllCities";
    const req = {
     
    };
  
    this.service.getPosts(apiUrl, req).subscribe(
      async (data) => {
        await loading.dismiss();
        console.log(data.success,data.data.data)
        if (data.success === true) {
         this.locationOptions = data.data.data

         
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

  async getAllcast(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    const apiUrl = this.service.Baseurl + "/Master/GetAllCasteOrCommunity";
    const req = {
     
    };
  
    this.service.getPosts(apiUrl, req).subscribe(
      async (data) => {
        await loading.dismiss();
        console.log(data.success,data.data.data)
        if (data.success === true) {
         this.casteOptions = data.data.data

         
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

  loadFilterOptions() {
    this.genderOptions = [
      { GenderID: 1, GenderType: 'Male' },
      { GenderID: 2, GenderType: 'Female' }
    ];

    
    this.ageOptions = [
      { AgeID: 1, AgeRange: '18 - 25' },
      { AgeID: 2, AgeRange: '26 - 35' }
    ];

    this.partnerOptions =[
      { partnerID: 1, partnerName: 'Bride' },
      { partnerID: 2, partnerName: 'Groom' }
    ]

    for (let i = 18; i <= 45; i++) {
      this.minAgeList.push(i);
    }
  
    for (let i = 20; i <= 60; i++) {
      this.maxAgeList.push(i);
    }
  }


 async applyFilters() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    const apiUrl = this.service.Baseurl + "/Profile/UserSearchProfile";
    const req = {
      "Gender": this.filter.partner == "Bride" ?"Female": "Male",
      "Location": JSON.stringify(this.filter.Location),
      "CasteOrCommunity": (this.filter.CasteOrCommunity),
      "MinAge": JSON.stringify(this.filter.MinAge),
      "MaxAge": JSON.stringify(this.filter.MaxAge),
    };
  
    this.service.getPosts(apiUrl, req).subscribe(
      async (data) => {
        await loading.dismiss();
        console.log(data.success,data)
        if (data.success === true) {
          this.profiles = data.data.profileData
          this.requesteddata = false;
          this.recentdata = false;
          this.Searcheddata = true
          this.openModal=false;
          this.nodatafound = data.data.profileData.length >0 ? false:true;
          this.resetFilters();
           }
        else {
          this.nodatafound = true
          this.openModal = false;
          this.Searcheddata = true;
          this.requesteddata = false;
          this.recentdata = false;
          this.resetFilters();
          const toast = await this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          await toast.present();
          this.styleToast(toast);
        }
      },
      async (err) => {
        this.nodatafound = true
        this.openModal=false;
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

 async acceptAndReject(event: Event,userdata:any,status:any){
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
            this.getUserInterestProfies()
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


  resetFilters() {
    this.filter = {
      partner:'',
      Gender: '',
     Location: '',
     CasteOrCommunity: '',
     MaxAge: '',
     MinAge:''
    };
  }


togglebutton(type:any){
  this.activeButton = type;
  
  
if(type == "1"){
  if(this.profiles.length > 0 ){
    this.Searcheddata = true
    this.requesteddata = false;
    this.recentdata = false;
  }else{
    this.openModal = true
    this.requesteddata = false;
    this.recentdata = false;
  }
  
}else if(type == '2'){
  this.Searcheddata = false
  this.requesteddata = true;
  this.recentdata = false;
}
else if(type == '3'){
  console.log("hghg")
  this.Searcheddata = false
  this.requesteddata = false;
  this.recentdata = true;
}
console.log(this.requesteddata,this.recentdata,"this.recentdatathis.recentdatathis.recentdata");

  }
//   {
//     "UserID": "36",
//     "InterestedUserID": "69",
//     "IsActive": 1
// }
  async SendInterestedRequest(userdata:any,status:any){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    const apiUrl = this.service.Baseurl + "/User/SendUserInterest";
    const req = {
      "UserID": this.userid,
      "InterestedUserID":userdata.UserID,
      "IsActive": 1,
    };
  
    this.service.getPosts(apiUrl, req).subscribe(
      async (data) => {
        await loading.dismiss();
         if (data.success === true) {
            this.getUserRecentProfies()
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
  togodetailspage(UserData:any){
    var navigationExtras: NavigationExtras = {
      queryParams: {
        UserID: JSON.stringify(UserData.UserID)
      }
    };
    this.router.navigate(['togoprofiledetails'],navigationExtras)
  }
}

