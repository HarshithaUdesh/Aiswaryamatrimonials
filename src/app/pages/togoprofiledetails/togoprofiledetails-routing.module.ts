import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TogoprofiledetailsPage } from './togoprofiledetails.page';

const routes: Routes = [
  {
    path: '',
    component: TogoprofiledetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TogoprofiledetailsPageRoutingModule {}
