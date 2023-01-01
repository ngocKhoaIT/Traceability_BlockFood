import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeReceiveComponent } from '../base/notice-receive/notice-receive.component';
import { NoticeSendComponent } from '../base/notice-send/notice-send.component';
import { SendComponent } from '../base/send/send.component';

import { RoleFactoryGuard } from '../shared/roleFactory.guard';

import { FactoryLayoutComponent } from './layout/layout.component';
import { ListCancelFactoryComponent } from './list-farm/list-cancel/listcancelfactory.component';
import { ListSubmitFactoryComponent } from './list-farm/list-submit/listsubmitfactory.component';
import { ListWaitFactoryComponent } from './list-farm/list-wait/listwaitfactory.component';
import { SearchFarmbyFactoryComponent } from './list-farm/search-farm-harvest/search.component';
import { ListViewInventoryFactoryComponent } from './list-inventory/list.component';
import { ListCancelFSComponent } from './list-store/list-cancel/listcancel.component';
import { ListSubmitFSComponent } from './list-store/list-submit/listsubmit.component';
import { ListWaitFSComponent } from './list-store/list-wait/listwait.component';
import { ProductComponent } from './product/product.component';
import { InventoryFactorybyStoreComponent } from './receive-goods/final.component';
import { SearchFactoryComponent } from './receive-merchants/search.component';
import { StaticFactoryComponent } from './static-factory/static-factory.component';
import { TypeProductComponent } from './type-product/type.component';

const routes: Routes = [
  {
    path: 'type/:id',
    component: TypeProductComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'product/:id',
    component: ProductComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'listviewinventoryfactory/:id',
    component: ListViewInventoryFactoryComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'inventoryfactorybystore/:id',
    component: InventoryFactorybyStoreComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'searchfactory/:id',
    component: SearchFactoryComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'listwaitfs/:id',
    component: ListWaitFSComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'listsubmitfs/:id',
    component: ListSubmitFSComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'listcancelfs/:id',
    component: ListCancelFSComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'searchfarmbyfactory/:id',
    component: SearchFarmbyFactoryComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'listwaitfactory/:id',
    component: ListWaitFactoryComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'listsubmitfactory/:id',
    component: ListSubmitFactoryComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'listcancelfactory/:id',
    component: ListCancelFactoryComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'notice-receive/:id', component:NoticeReceiveComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'notice-send/:id', component:NoticeSendComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'send/:id', component:SendComponent, canActivate: [RoleFactoryGuard] 
  },
  {
    path: 'staticFactory/:id', component:StaticFactoryComponent, canActivate: [RoleFactoryGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryRoutingModule { }
