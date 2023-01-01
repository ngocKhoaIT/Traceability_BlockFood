import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from '../shared/role.guard';

import { HomeComponent } from './home.component';

import { NoticeReceiveComponent } from '../base/notice-receive/notice-receive.component';
import { NoticeSendComponent } from '../base/notice-send/notice-send.component';
import { SendComponent } from '../base/send/send.component';

import { FactoryComponent } from '../manage/factory/factory.component';
import { FarmComponent } from '../manage/farm/farm.component';
import { MerchantComponent } from '../manage/merchant/merchant.component';
import { StatisticComponent } from '../manage/statistic/statistic.component';
import { StoreComponent } from '../manage/store/store.component';
import { TransportComponent } from '../manage/transport/transport.component';
import { UserComponent } from '../manage/user/user.component';

const routes: Routes = [
  { path: '', component: StatisticComponent },
  {
    path: 'farm',
    component: FarmComponent,
    canActivate: [RoleGuard]
  },
  {
    path: 'factory',
    component: FactoryComponent,
    canActivate: [RoleGuard]
  },
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [RoleGuard]
  },
  {
    path: 'transport',
    component: TransportComponent,
    canActivate: [RoleGuard]
  },
  {
    path: 'merchant',
    component: MerchantComponent,
    canActivate: [RoleGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [RoleGuard]
  },
  {
    path: 'statistic',
    component: StatisticComponent,
    canActivate: [RoleGuard]
  },
  {
    path: 'notice-receive/:id', component: NoticeReceiveComponent, canActivate: [RoleGuard]
  },
  {
    path: 'notice-send/:id', component: NoticeSendComponent, canActivate: [RoleGuard]
  },
  {
    path: 'send/:id', component: SendComponent, canActivate: [RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
