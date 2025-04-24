import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TogoprofiledetailsPageRoutingModule } from './togoprofiledetails-routing.module';

import { TogoprofiledetailsPage } from './togoprofiledetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TogoprofiledetailsPageRoutingModule
  ],
  declarations: [TogoprofiledetailsPage]
})
export class TogoprofiledetailsPageModule {}
