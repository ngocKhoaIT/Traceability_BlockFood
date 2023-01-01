import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { InFoTransport, TransportLayoutComponent } from './layout/layout.component';
import { SearchTransportComponent } from './receiveGoods/search-farm-harvest/search.component';
import { SearchTransportOrderComponent } from './transfer/search.component';
import { ListViewTransportComponent } from './list/list.component';
import { StaticTransportComponent } from './static-transport/static-transport.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    TransportLayoutComponent,
    SearchTransportComponent,
    SearchTransportOrderComponent,
    ListViewTransportComponent,
    InFoTransport,
    StaticTransportComponent,
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe,{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
})
export class TransportModule { }
