import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeReceiveComponent } from '../base/notice-receive/notice-receive.component';
import { NoticeSendComponent } from '../base/notice-send/notice-send.component';
import { SendComponent } from '../base/send/send.component';
import { RoleFarmGuard } from '../shared/roleFarm.guard';
import { FruitComponent } from './fruit/fruit.component';
import { HarvestComponent } from './harvest/harvest.component';
import { ListCancelFarmComponent } from './list-cancel/listcancelfarm.component';
import { ListSubmitFarmComponent } from './list-submit/listsubmitfarm.component';
import { ListWaitFarmComponent } from './list-wait/listwaitfarm.component';
import { SeedComponent } from './seed/seed.component';
import { StaticFarmComponent } from './static-farm/static-farm.component';

const routes: Routes = [
  {
    path: 'fruit/:id',
    component: FruitComponent,
    canActivate: [RoleFarmGuard]
  },
  {
    path: 'seed/:id',
    component: SeedComponent,
    canActivate: [RoleFarmGuard]
  },
  {
    path: 'harvest/:id',
    component: HarvestComponent,
    canActivate: [RoleFarmGuard]
  },
  {
    path: 'listwaitfarm/:id',
    component: ListWaitFarmComponent,
    canActivate: [RoleFarmGuard]
  },
  {
    path: 'listsubmitfarm/:id',
    component: ListSubmitFarmComponent,
    canActivate: [RoleFarmGuard]
  },
  {
    path: 'listcancelfarm/:id',
    component: ListCancelFarmComponent,
    canActivate: [RoleFarmGuard]
  },
  {
    path: 'notice-receive/:id', component:NoticeReceiveComponent,
    canActivate: [RoleFarmGuard]
  },
  {
    path: 'notice-send/:id', component:NoticeSendComponent,
    canActivate: [RoleFarmGuard]
  },
  {
    path: 'send/:id', component:SendComponent,
    canActivate: [RoleFarmGuard]
  },
  {
    path: 'staticFarm/:id', component:StaticFarmComponent,
    canActivate: [RoleFarmGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmRoutingModule { }
