import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { InFoMerchant, MerchantLayoutComponent } from './layout/layout.component';
import { popUpBuy, popUpSearchFarm, SearchFarmComponent } from './search-farm-harvest/search.component';
import { ListWaitMerchantComponent } from './list-wait/listwaitmerchant.component';
import { ListSubmitMerchantComponent, popUpDetail } from './list-submit/listsubmitmerchant.component';
import { ListCancelMerchantComponent } from './list-cancel/listcancelmerchant.component';
import { StaticMerchantComponent } from './static-merchant/static-merchant.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    MerchantLayoutComponent,
    SearchFarmComponent,
    popUpSearchFarm,
    popUpBuy,
    ListWaitMerchantComponent,
    ListSubmitMerchantComponent,
    ListCancelMerchantComponent,
    popUpDetail,
    InFoMerchant,
    StaticMerchantComponent,
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe,{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
})
export class MerchantModule { }
