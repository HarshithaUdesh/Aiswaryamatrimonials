import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  userimages:any;
  myplanlist:any;
  profiledata:any;
  profiledataedit:any
  selectedOption = 'about';
  openModalpersonal:boolean=false;
  openLifeModal:boolean=false;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

day: any;
month: any;
year: any;
hour: any;
minute: any;
amPm: any;
openContactModal:boolean=false;
openEducationModal:boolean=false
openProfessionalModal:any=false;
openFamilyModal:any=false;
openPreferenceModal:any=false;
  constructor(private sanitizer: DomSanitizer,public router: Router, public service: ServicesService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }


  closeModel(){
    this.openModalpersonal=false;
  this.openLifeModal=false;
  this.openContactModal=false;
this.openEducationModal=false
this.openProfessionalModal=false;
this.openFamilyModal=false;
this.openPreferenceModal=false;
  }
  ionViewDidEnter() {
    this.getMyPlanData();
    this.getProfileDetailsData();
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader(); 
      reader.onload = (e) => {
        this.profiledataedit.Profile_Image = e.target?.result as string;
      };
      reader.readAsDataURL(file); 
    }
  }

  styleToast(toast: HTMLIonToastElement) {
    const toastElement = toast.shadowRoot?.querySelector('.toast-container');
    if (toastElement) {
      toastElement.setAttribute('style', 'background-color:#000; color: white; border-radius: 8px;');
    }
  }

  async getMyPlanData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    var userid = localStorage.getItem("userid");
    const planapi = this.service.Baseurl + "/Profile/GetUserCurrentPlan";
    const planarray = {
      "UserID": userid 
    };
  
    this.service.getPosts(planapi, planarray).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          this.myplanlist = data.data.data;
        } else {
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

  subscriptionHistoryPage(){
    this.router.navigate(['subscriptionhistory']);
  }

  segmentChanged(event: any) {
    this.selectedOption = event.detail.value;
  }

  async getProfileDetailsData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
  
    var userid = localStorage.getItem("userid");
    const planapi = this.service.Baseurl + "/Profile/GetProfileDetails";
    const planarray = {
      "UserID": userid 
    };
  
    this.service.getPosts(planapi, planarray).subscribe(
      async (data) => {
        await loading.dismiss();
        if (data.success === true) {
          this.profiledata = data.data.profileData;
          this.profiledataedit=data.data.profileData[0];
          if (this.profiledataedit.DOB) {
            const dob = new Date(this.profiledataedit.DOB);
            this.day = dob.getDate();
            this.month = this.months[dob.getMonth()];
            this.year = dob.getFullYear();
          }
        
          if (this.profiledataedit.TimeOfBirth) {
            const timeParts = this.profiledataedit.TimeOfBirth.split(/[:\s]/);
            this.hour = parseInt(timeParts[0], 10);
            this.minute = parseInt(timeParts[1], 10);
            this.amPm = timeParts[2];
          }
        } else {
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
  handlepersonalmodal(value:any){
    this.openModalpersonal=value;
  }
  handleContactModal(value:any){
    this.openContactModal=value;
  }
  handleopenEducationModal(value:any){
    this.openEducationModal=value
  }
  handleopenProfessionalModal(value:any){
    this.openProfessionalModal=value
  }
  handleopenLifeModal(value:any){
    this.openLifeModal=value
  }
  handleopenFamilyModal(value:any){
    this.openFamilyModal=value
  }
  handleopenPreferenceModal(value:any){
    this.openPreferenceModal=value
  }
  async updateProfiledata(){
    const monthIndex = this.months.indexOf(this.month);
  const dobDate = new Date(this.year, monthIndex, this.day);
  this.profiledataedit.DOB = dobDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

  this.profiledataedit.TimeOfBirth = `${this.hour}:${this.minute} ${this.amPm}`;

  console.log(this.profiledataedit)

  // Profile/SaveProfileDetails.

  const loading = await this.loadingCtrl.create({
    message: 'Please wait...',
  });
  await loading.present();

  var userid = localStorage.getItem("userid");
  const planapi = this.service.Baseurl + "/Profile/SaveProfileDetails";
  const requestbody = {
    UserID: userid || 0,
    FirstName: this.profiledataedit.FirstName || "",
    LastName: this.profiledataedit.LastName || "",
    DOB: this.profiledataedit.DOB || "",
    Age: parseInt(this.profiledataedit.Age) || 0,
    Height: parseInt(this.profiledataedit.Height) || 0,
    Weight: parseInt(this.profiledataedit.Weight) || 0,
    BloodGroup: this.profiledataedit.BloodGroup || "",
    Gender: this.profiledataedit.Gender || "",
    MotherTongue: this.profiledataedit.MotherTongue || "",
    Religion: this.profiledataedit.Religion || "",
    CasteOrCommunity: this.profiledataedit.CasteOrCommunity || "",
    SubCaste: this.profiledataedit.SubCaste || "",
    Gotra: this.profiledataedit.Gotra || "",
    ManglikStatus: this.profiledataedit.ManglikStatus != null ? this.profiledataedit.ManglikStatus.toString() : "0",
    PlaceOfBirth: this.profiledataedit.PlaceOfBirth || "",
    TimeOfBirth: this.profiledataedit.TimeOfBirth || "",
    BirthStar: this.profiledataedit.BirthStar || "",
    Rashi: this.profiledataedit.Rashi || "",
    AboutMe: this.profiledataedit.AboutMe || "",
    Profile_Image: this.profiledataedit.Profile_Image || "",
    MaritalStatus: this.profiledataedit.MaritalStatus || "",
    Occupation: this.profiledataedit.Occupation || "",
    Company: this.profiledataedit.Company || "",
    AnnualIncome: parseInt(this.profiledataedit.AnnualIncome) || 0,
    JobLocation: this.profiledataedit.JobLocation || "",
    WorkExperience: this.profiledataedit.WorkExperience || "",
    FathersOccupation: this.profiledataedit.FathersOccupation || "",
    MothersOccupation: this.profiledataedit.MothersOccupation || "",
    Siblings: this.profiledataedit.Siblings || "",
    FamilyType: this.profiledataedit.FamilyType || "",
    FamilyValues: this.profiledataedit.FamilyValues || "",
    DietPreference: this.profiledataedit.DietPreference || "",
    Drinking: this.profiledataedit.Drinking || "",
    Smoking: this.profiledataedit.Smoking || "",
    HobbiesAndInterests: this.profiledataedit.HobbiesAndInterests || "",
    SportsActivities: this.profiledataedit.SportsActivities || "",
    PreferredMarriageLocation: this.profiledataedit.PreferredMarriageLocation || "",
    HighestQualification: this.profiledataedit.HighestQualification || this.profiledataedit.EducationalQualifications || "",
    InstituteOrUniversity: this.profiledataedit.InstituteOrUniversity || "",
    YearOfGraduation: this.profiledataedit.YearOfGraduation || "",
    AdditionalQualifications: this.profiledataedit.AdditionalQualifications || "",
    LanguagesKnown: this.profiledataedit.LanguagesKnown || "",
    MobileNo: this.profiledataedit.MobileNo || "",
    EmailID: this.profiledataedit.EmailID || "",
    Address: this.profiledataedit.Address || "",
    City: parseInt(this.profiledataedit.CityID) || 0,
    State: parseInt(this.profiledataedit.StateID) || 0,
    Pincode: this.profiledataedit.Pincode || "",
    PreferredAgeRange: this.profiledataedit.AgeRange || "",
    PreferredHeight: this.profiledataedit.HeightRange || "",
    PreferredCasteCommunity: parseInt(this.profiledataedit.PreferredCasteCommunityId) || 0,
    PreferredSubCaste: parseInt(this.profiledataedit.PreferredSubCasteId) || 0,
    PreferredEducation: this.profiledataedit.EducationalQualifications || "",
    PreferredOccupationIncome: this.profiledataedit.OccupationIncomePreferences || "",
    PreferredStateID: parseInt(this.profiledataedit.PreferredStateID) || 0,
    PreferredCity: parseInt(this.profiledataedit.PreferredCity) || 0,
    PreferredOthers: this.profiledataedit.OtherPreferences || "",
    PreferredManglik: this.profiledataedit.Manglik || "",
    Base64ProfileImages: this.profiledataedit.Base64ProfileImages,
    CreatedBy: userid || 0,
  };
  

  this.service.getPosts(planapi, requestbody).subscribe(
    async (data) => {
      await loading.dismiss();
      if (data.success === true) {
        this.getProfileDetailsData();
        this.closeModel()
        const toast = await this.toastCtrl.create({
          message: "Profile Updated successfully!",
          duration: 3000
        });
        await toast.present();
        this.styleToast(toast);
      
      } else {
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
