import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [

  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children:[{
          path: '',
          loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
        }]
      },
      {
        path: 'matches',
        children:[{
          path: '',
          loadChildren: () => import('../matches/matches.module').then(m => m.MatchesPageModule)
        }]
      },
      {
        path: 'profile',
        children:[{
          path: '',
          loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
        }]
      },
      {
        path: 'subscription',
        children:[{
          path: '',
          loadChildren: () => import('../subscription/subscription.module').then( m => m.SubscriptionPageModule)
        }]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
