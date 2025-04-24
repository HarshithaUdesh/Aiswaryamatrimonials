import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionhistoryPageRoutingModule } from './subscriptionhistory-routing.module';

import { SubscriptionhistoryPage } from './subscriptionhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionhistoryPageRoutingModule
  ],
  declarations: [SubscriptionhistoryPage]
})
export class SubscriptionhistoryPageModule {}
