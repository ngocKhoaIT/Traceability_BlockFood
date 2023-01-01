import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeReceiveComponent } from '../base/notice-receive/notice-receive.component';
import { NoticeSendComponent } from '../base/notice-send/notice-send.component';
import { SendComponent } from '../base/send/send.component';
import { RoleTransportGuard } from '../shared/roleTransport.guard';
import { TransportLayoutComponent } from './layout/layout.component';
import { ListViewTransportComponent } from './list/list.component';
import { SearchTransportComponent } from './receiveGoods/search-farm-harvest/search.component';
import { StaticTransportComponent } from './static-transport/static-transport.component';
import { SearchTransportOrderComponent } from './transfer/search.component';

const routes: Routes = [
  {
    path: 'searchTransport/:id',
    component: SearchTransportComponent, canActivate: [RoleTransportGuard]
  },
  {
    path: 'searchTransportOrder/:id',
    component: SearchTransportOrderComponent, canActivate: [RoleTransportGuard]

  },
  {
    path: 'listviewtransport/:id',
    component: ListViewTransportComponent, canActivate: [RoleTransportGuard]
  },
  {
    path: 'notice-receive/:id', component:NoticeReceiveComponent, canActivate: [RoleTransportGuard]
  },
  {
    path: 'notice-send/:id', component:NoticeSendComponent, canActivate: [RoleTransportGuard]
  },
  {
    path: 'send/:id', component:SendComponent, canActivate: [RoleTransportGuard]
  },
  {
    path: 'staticTransport/:id', component:StaticTransportComponent, canActivate: [RoleTransportGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
