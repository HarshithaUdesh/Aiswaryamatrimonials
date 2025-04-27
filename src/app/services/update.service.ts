import { Injectable } from '@angular/core';
import { Observable, of, Observer, BehaviorSubject } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Market } from '@awesome-cordova-plugins/market/ngx';

interface AppUpdate {
  current: string;
  enabled: boolean;
  msg?: {
    title: string;
    msg: string;
    btn: string;
  };
  majorMsg?: {
    title: string;
    msg: string;
    btn: string;
  };
  minorMsg?: {
    title: string;
    msg: string;
    btn: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  appval: any;
  version: any;

  updateApp = 'https://matrimonialwebapi.azurewebsites.net/api/SchemaMaster/GetVersion';

  constructor(private market: Market,public iab: InAppBrowser,public appversion: AppVersion,public platform: Platform,private httpClient: HttpClient, public alertCtrl: AlertController) { }

  async checkForUpdate() {
    var appname = {
      "ApplicationName": "Aishwarya Matrimonial"
    }
    this.httpClient.post(this.updateApp, appname).subscribe((info: any) => {
      {
        this.appversion.getVersionNumber().then(res => {
          this.version = res;
          const splitVersion = this.version;
          const serverVersion = info.data.androidVersion;
          const splitVersionParts = splitVersion.split('.').map(Number);
          const serverVersionParts = serverVersion.split('.').map(Number);

          if (serverVersionParts[0] > splitVersionParts[0]) {
            this.presentAlert("Important App Update", "Please update your app to the latest version to continue using it", "Download");
          } else if (serverVersionParts[0] === splitVersionParts[0] && serverVersionParts[1] > splitVersionParts[1]) {
            this.presentAlert("Important App Update", "Please update your app to the latest version to continue using it", "Download");
          } else if (serverVersionParts[0] === splitVersionParts[0] && serverVersionParts[1] === splitVersionParts[1] && serverVersionParts[2] > splitVersionParts[2]) {
            this.presentAlert("App update available", "There's a new version available, would you like to get it now?", "Download", true);
          }
        }).catch(error => {
          console.log(error);
        });
      }
    })
  }

  openAppstoreEntry() {
    if (this.platform.is('android')) {
      this.market.open('com.vishwasworld.vishwaspe').then((res)=>{

      }).catch((err)=>{
        alert(JSON.stringify(err))
      });
    } else {
      // this.iab.create('App Store URL','_blank');
    }
  }

  async presentAlert(title: any, message: any, buttonText = '', allowClose = false) {

    const buttons: any = [];

    if (buttonText != '') {
      buttons.push({
        text: buttonText,
        handler: () => {
          this.openAppstoreEntry();
        }
      })
    }
    if (allowClose) {
      buttons.push({
        text: 'Close',
        role: 'cancel'
      })
    }
    const alerts = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      backdropDismiss: false,
      buttons: buttons
    });
    await alerts.present();
  }

}
