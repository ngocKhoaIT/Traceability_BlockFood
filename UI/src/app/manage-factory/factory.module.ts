import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FactoryRoutingModule } from './factory-routing.module';
import { FactoryLayoutComponent, InFoFactory } from './layout/layout.component';
import { ProductComponent } from './product/product.component';
import { SearchFactoryComponent } from './receive-merchants/search.component';
import { ListWaitFSComponent } from './list-store/list-wait/listwait.component';
import { ListSubmitFSComponent } from './list-store/list-submit/listsubmit.component';
import { ListCancelFSComponent } from './list-store/list-cancel/listcancel.component';
import { ListCancelFactoryComponent } from './list-farm/list-cancel/listcancelfactory.component';
import { ListSubmitFactoryComponent, popUpDetailFAS } from './list-farm/list-submit/listsubmitfactory.component';
import { ListWaitFactoryComponent } from './list-farm/list-wait/listwaitfactory.component';
import { popUpType, TypeProductComponent } from './type-product/type.component';
import { ListViewInventoryFactoryComponent } from './list-inventory/list.component';
import { popUpBuybyFactory, popUpSearchFarmbyFactory, SearchFarmbyFactoryComponent } from './list-farm/search-farm-harvest/search.component';
import { InventoryFactorybyStoreComponent } from './receive-goods/final.component';
import { StaticFactoryComponent } from './static-factory/static-factory.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    FactoryLayoutComponent,
    InFoFactory,

    ProductComponent,

    SearchFactoryComponent,
    ListWaitFSComponent,
    ListSubmitFSComponent,
    ListCancelFSComponent,

    ListCancelFactoryComponent,
    ListSubmitFactoryComponent,
    ListWaitFactoryComponent,
    popUpDetailFAS,

    TypeProductComponent,
    popUpType,

    ListViewInventoryFactoryComponent, 

    SearchFarmbyFactoryComponent, 
    popUpSearchFarmbyFactory,
    popUpBuybyFactory,
    
    InventoryFactorybyStoreComponent,
    StaticFactoryComponent,
  ],
  imports: [
    CommonModule,
    FactoryRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe,{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
})
export class FactoryModule { }
