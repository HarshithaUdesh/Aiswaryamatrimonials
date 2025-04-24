import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionhistoryPage } from './subscriptionhistory.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionhistoryPageRoutingModule {}
