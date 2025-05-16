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
  getloadprofiles:any[]=[];
  Searcheddata:boolean = false;
  initalload:boolean = true;
  requesteddata:boolean = false;
  recentdata:boolean = false;
  activeButton: string = '1';
  nodatafound :boolean = true;
  nodatafoundreq:boolean=true;
  nodatafoundrecent:boolean=true;
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
  bannerlist:any[] = [];

  selectpartner = {
    header: 'Select Partner',
    cssClass: 'select-custom-alert'
  };
  selectLocation = {
    header: 'Select Location',
    cssClass: 'select-custom-alert'
  };
  selectCaste = {
    header: 'Select Caste',
    cssClass: 'select-custom-alert'
  };
  selectminage = {
    header: 'Select Min Age',
    cssClass: 'select-custom-alert'
  };
  selectmaxage = {
    header: 'Select Max Age',
    cssClass: 'select-custom-alert'
  };

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
    this.getBannerImages();
   
  }
  ionViewDidEnter(){
    this.getBannerImages();
    this.loadFilterOptions();
    this.getAllLocation()
    this.getAllcast()
    this.getUserRecentProfies()
    this.getUserInterestProfies()
    this.getloadProfiesinital()

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

  togotnotifications(){
    this.router.navigate(['notifications'])
  }
async  getUserInterestProfies(){
  const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      // await loading.present();
    
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
           this.nodatafoundreq=this.interestedProfile.length>0?false:true

           }
          else {
            const toast = await this.toastCtrl.create({
              message: data.message,
              duration: 3000
            });
            // await toast.present();
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
        // await loading.present();
      
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
             this.nodatafoundrecent=this.viwersProfile.length>0?false:true
             }
            else {
              const toast = await this.toastCtrl.create({
                message: data.message,
                duration: 3000
              });
              // await toast.present();
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

 async  getloadProfiesinital(){
   const loading = await this.loadingCtrl.create({
     message: 'Please wait...',
   });
   await loading.present();

   const apiUrl = this.service.Baseurl + "/Profile/GetUserPartnerPreferences";
   const req = {
     UserID: this.userid,
   };

   this.service.getPosts(apiUrl, req).subscribe(
     async (data) => {
       await loading.dismiss();
       console.log(data.success, data)
       if (data.success === true) {
         this.getloadprofiles = data.data.data
         this.nodatafound= this.getloadprofiles.length>0?false:true;
       }
       else {

         const toast = await this.toastCtrl.create({
           message: data.message,
           duration: 3000
         });
        //  await toast.present();
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
    // await loading.present();
    
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
          // await toast.present();
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

  async getBannerImages(){
    // const loading = await this.loadingCtrl.create({
    //   message: 'Please wait...',
    // });
    // await loading.present();
    const bannerUrl = this.service.Baseurl + "/Profile/GetImages";
    const bannerreq = {
     
    };
  
    this.service.getPosts(bannerUrl, bannerreq).subscribe(
      async (data) => {
        // await loading.dismiss();
        console.log(data.success,data.data.data)
        if (data.success === true) {
         this.bannerlist = data.data;
        //  console.log(this.bannerlist,"LLLLLLLLLLLLLLLL")
        }
        else {
          const toast = await this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          // await toast.present();
          this.styleToast(toast);
        }
      },
      async (err) => {
        // await loading.dismiss();
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
    // await loading.present();
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
          // await toast.present();
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
    var userid = localStorage.getItem("userid");
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    const apiUrl = this.service.Baseurl + "/Profile/GetSearchProfileDetailsSummary";
    const req = {
      "Gender": this.filter.partner == "Bride" ?"Female": "Male",
      "Location": JSON.stringify(this.filter.Location),
      "CasteOrCommunity": (this.filter.CasteOrCommunity),
      "MinAge": JSON.stringify(this.filter.MinAge),
      "MaxAge": JSON.stringify(this.filter.MaxAge),
      "UserID": userid
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
          this.initalload = false
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
          this.initalload = false;
          this.resetFilters();
          const toast = await this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          // await toast.present();
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
          // await toast.present();
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
    this.initalload = false;
    this.getloadprofiles = []
  }else{
    this.Searcheddata = true;
    this.requesteddata = false;
    this.recentdata = false;
    // this.initalload = true;
  }
  
}else if(type == '2'){
  this.Searcheddata = false
  this.requesteddata = true;
  this.recentdata = false;
  this.initalload = false;
}
else if(type == '3'){
  this.Searcheddata = false
  this.requesteddata = false;
  this.recentdata = true;
  this.initalload = false;
}

  }

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
  async SendcancelInterestedRequest(userdata:any,status:any){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    const apiUrl = this.service.Baseurl + "/User/SendUserInterest";
    const req = {
      "UserID": this.userid,
      "InterestedUserID":userdata.UserID,
      "IsActive": status,
    };
  
    this.service.getPosts(apiUrl, req).subscribe(
      async (data) => {
        await loading.dismiss();
         if (data.success === true) {
            // this.getUserRecentProfies()
            this.getloadProfiesinital()
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

  togodetailspagewithactions(UserData:any){
    var navigationExtras: NavigationExtras = {
      queryParams: {
        UserID: JSON.stringify(UserData.UserID),
        Action:UserData.IsActive
      }
    };
    this.router.navigate(['togoprofiledetails'],navigationExtras)
  }
}

