import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeReceiveComponent } from '../base/notice-receive/notice-receive.component';
import { NoticeSendComponent } from '../base/notice-send/notice-send.component';
import { SendComponent } from '../base/send/send.component';
import { RoleStoreGuard } from '../shared/roleStore.guard';
import { ListViewInventoryStoreComponent } from './inventory/list-inventory/list.component';
import { InventoryMerchantbyStoreComponent } from './inventory/receive-byMerchant/search.component';
import { FinalComponent } from './inventory/receive-goods/final.component';
import { StoreLayoutComponent } from './layout/layout.component';
import { ListCancelSFComponent } from './list-factory/list-cancel/listcancel.component';
import { ListSubmitSFComponent } from './list-factory/list-submit/listsubmit.component';
import { ListWaitSFComponent } from './list-factory/list-wait/listwait.component';
import { SearchStoreComponent } from './list-factory/search/search.component';
import { ListCancelStoreComponent } from './list-farm/list-cancel/listcancelstore.component';
import { ListSubmitStoreComponent } from './list-farm/list-submit/listsubmitstore.component';
import { ListWaitStoreComponent } from './list-farm/list-wait/listwaitstore.component';
import { SearchFarmbyStoreComponent } from './list-farm/search-farm-harvest/search.component';
import { ListSoldComponent } from './list-item/list-sold/list-sold.component';
import { ListStockingComponent } from './list-item/list-stocking/list-stocking.component';
import { SellComponent } from './sell/sell.component';
import { StaticStoreComponent } from './static-store/static-store.component';

const routes: Routes = [
  {
    path: 'searchStore/:id',
    component: SearchStoreComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'inventorymerchantbystore/:id',
    component: InventoryMerchantbyStoreComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'listviewinventorystore/:id',
    component: ListViewInventoryStoreComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'listwaitsf/:id',
    component: ListWaitSFComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'listsubmitsf/:id',
    component: ListSubmitSFComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'listcancelsf/:id',
    component: ListCancelSFComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'final/:id',
    component: FinalComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'searchfarmbystore/:id',
    component: SearchFarmbyStoreComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'listwaitstore/:id',
    component: ListWaitStoreComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'listsubmitstore/:id',
    component: ListSubmitStoreComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'listcancelstore/:id',
    component: ListCancelStoreComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'notice-receive/:id', component:NoticeReceiveComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'notice-send/:id', component:NoticeSendComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'send/:id', component:SendComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'staticStore/:id', component:StaticStoreComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'sell/:id', component:SellComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'listsold/:id', component:ListSoldComponent, canActivate: [RoleStoreGuard]
  },
  {
    path: 'liststocking/:id', component: ListStockingComponent, canActivate: [RoleStoreGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
