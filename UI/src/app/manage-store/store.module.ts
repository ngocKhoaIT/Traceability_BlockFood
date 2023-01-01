import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { InFoStore, StoreLayoutComponent } from './layout/layout.component';
import { popUpBuyProduct, popUpSearchProduct, SearchStoreComponent } from './list-factory/search/search.component';
import { FinalComponent, popUpReceiveFruit } from './inventory/receive-goods/final.component';
import { ListWaitSFComponent } from './list-factory/list-wait/listwait.component';
import { ListSubmitSFComponent, popUpDetailSF } from './list-factory/list-submit/listsubmit.component';
import { ListCancelSFComponent } from './list-factory/list-cancel/listcancel.component';
import { ListWaitStoreComponent } from './list-farm/list-wait/listwaitstore.component';
import { ListSubmitStoreComponent, popUpDetailSFA } from './list-farm/list-submit/listsubmitstore.component';
import { ListCancelStoreComponent } from './list-farm/list-cancel/listcancelstore.component';
import { popUpBuybyStore, popUpSearchFarmbyStore, SearchFarmbyStoreComponent } from './list-farm/search-farm-harvest/search.component';
import { InventoryMerchantbyStoreComponent } from './inventory/receive-byMerchant/search.component';
import { ListViewInventoryStoreComponent } from './inventory/list-inventory/list.component';
import { StaticStoreComponent } from './static-store/static-store.component';
import { SellComponent } from './sell/sell.component';
import { ListSoldComponent } from './list-item/list-sold/list-sold.component';
import { ListStockingComponent } from './list-item/list-stocking/list-stocking.component';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    StoreLayoutComponent,

    SearchStoreComponent,
    FinalComponent,
    popUpSearchProduct,
    popUpBuyProduct,

    ListWaitSFComponent,
    ListSubmitSFComponent,
    ListCancelSFComponent,
    popUpDetailSF,

    ListWaitStoreComponent,
    ListSubmitStoreComponent,
    ListCancelStoreComponent,
    popUpDetailSFA,

    SearchFarmbyStoreComponent,
    popUpBuybyStore,
    popUpSearchFarmbyStore,

    InventoryMerchantbyStoreComponent,
    ListViewInventoryStoreComponent,
    InFoStore,

    popUpReceiveFruit,

    StaticStoreComponent,

    SellComponent,
    ListSoldComponent,
    ListStockingComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe,{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
})
export class StoreModule { }
