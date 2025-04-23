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

minAge: number | undefined;
maxAge: number | undefined;
  profiles = [
    {
      name: 'Aishwaryashet',
      gender: 'Female',
      age: 24,
      profession: 'Engineering',
      image: 'assets/images/aishwarya.jpg'
    },
    {
      name: 'SnehaBhat',
      gender: 'Female',
      age: 23,
      profession: 'Software Engineer',
      image: 'assets/images/sneha.jpg'
    }
  ];
  constructor(public router: Router, public service: ServicesService, public toastCtrl: ToastController,public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadFilterOptions();
    this.getAllLocation()
    this.getAllcast()
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

// async  getSeachedProfies(){
  
//       const loading = await this.loadingCtrl.create({
//         message: 'Please wait...',
//       });
//       await loading.present();
    
//       const apiUrl = this.service.Baseurl + "/Profile/GetSearchProfileDetailsSummary'";
//       const req = {
//         UserID:36,
//         "Gender": "male",
//         "Location": "164",
//         "CasteOrCommunity": "Other Backward Classes (OBCs)",
//         "MinAge": 29,
//         "MaxAge": 31,
//       };
    
//       this.service.getPosts(apiUrl, req).subscribe(
//         async (data) => {
//           await loading.dismiss();
//           console.log(data.success,data)
//           if (data.success === true) {
           
  
           
//           }
//           else {
//             const toast = await this.toastCtrl.create({
//               message: data.message,
//               duration: 3000
//             });
//             await toast.present();
//             this.styleToast(toast);
//           }
//         },
//         async (err) => {
//           await loading.dismiss();
//           const toast = await this.toastCtrl.create({
//             message: "Poor Internet connection/ Network Not Available, pls try again..",
//             duration: 3000
//           });
//           await toast.present();
//           this.styleToast(toast);
//         }
//       );
    
//   }


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
  
    const apiUrl = this.service.Baseurl + "/Profile/GetSearchProfileDetailsSummary'";
    const req = {
      "UserID":localStorage.getItem('userid'),
      "Gender": this.filter.partner == "Bride" ?"Female": "Male",
      "Location": this.filter.Location,
      "CasteOrCommunity": this.filter.CasteOrCommunity,
      "MinAge": this.filter.MinAge,
      "MaxAge": this.filter.MaxAge,
    };
  
    this.service.getPosts(apiUrl, req).subscribe(
      async (data) => {
        await loading.dismiss();
        console.log(data.success,data)
        if (data.success === true) {
          this.openModal=false;
           }
        else {
          this.openModal=false;
          const toast = await this.toastCtrl.create({
            message: data.message,
            duration: 3000
          });
          await toast.present();
          this.styleToast(toast);
        }
      },
      async (err) => {
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
}
