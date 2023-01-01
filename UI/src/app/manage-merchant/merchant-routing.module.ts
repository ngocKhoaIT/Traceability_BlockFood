import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeReceiveComponent } from '../base/notice-receive/notice-receive.component';
import { NoticeSendComponent } from '../base/notice-send/notice-send.component';
import { SendComponent } from '../base/send/send.component';
import { RoleMerchantGuard } from '../shared/roleMerchant.guard';
import { MerchantLayoutComponent } from './layout/layout.component';
import { ListCancelMerchantComponent } from './list-cancel/listcancelmerchant.component';
import { ListSubmitMerchantComponent } from './list-submit/listsubmitmerchant.component';
import { ListWaitMerchantComponent } from './list-wait/listwaitmerchant.component';
import { SearchFarmComponent } from './search-farm-harvest/search.component';
import { StaticMerchantComponent } from './static-merchant/static-merchant.component';

const routes: Routes = [
  {
    path: 'searchFarm/:id',
    component: SearchFarmComponent, canActivate: [RoleMerchantGuard]
  },
  {
    path: 'listwaitmerchant/:id',
    component: ListWaitMerchantComponent, canActivate: [RoleMerchantGuard]
  },
  {
    path: 'listsubmitmerchant/:id',
    component: ListSubmitMerchantComponent, canActivate: [RoleMerchantGuard]
  },
  {
    path: 'listcancelmerchant/:id',
    component: ListCancelMerchantComponent, canActivate: [RoleMerchantGuard]
  },
  {
    path: 'notice-receive/:id', component:NoticeReceiveComponent, canActivate: [RoleMerchantGuard]
  },
  {
    path: 'notice-send/:id', component:NoticeSendComponent, canActivate: [RoleMerchantGuard]
  },
  {
    path: 'send/:id', component:SendComponent, canActivate: [RoleMerchantGuard]
  },
  {
    path: 'staticMerchant/:id', component:StaticMerchantComponent, canActivate: [RoleMerchantGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }
