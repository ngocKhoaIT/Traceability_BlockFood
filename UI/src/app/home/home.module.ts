import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { FarmComponent, popEditFarm } from '../manage/farm/farm.component';
import { FactoryComponent, popEditFactory } from '../manage/factory/factory.component';
import { popEditStore, StoreComponent } from '../manage/store/store.component';
import { popEditTransport, TransportComponent } from '../manage/transport/transport.component';
import { popUpPerson, popUpUser, UserComponent } from '../manage/user/user.component';
import { MerchantComponent, popEditMerchant } from '../manage/merchant/merchant.component';
import { StatisticComponent } from '../manage/statistic/statistic.component';



@NgModule({
  declarations: [
    HomeComponent,
    
    FarmComponent,
    popEditFarm,

    FactoryComponent,
    popEditFactory,

    StoreComponent,
    popEditStore,
    
    TransportComponent,
    popEditTransport,

    UserComponent,
    popUpPerson,
    popUpUser,

    MerchantComponent,
    popEditMerchant,

    StatisticComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
})
export class HomeModule { }
