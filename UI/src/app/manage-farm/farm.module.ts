import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FarmRoutingModule } from './farm-routing.module';
import { FarmLayoutComponent, InFoFarm } from './layout/layout.component';
import { FruitComponent } from './fruit/fruit.component';
import { HarvestComponent } from './harvest/harvest.component';
import { ListWaitFarmComponent } from './list-wait/listwaitfarm.component';
import { ListSubmitFarmComponent } from './list-submit/listsubmitfarm.component';
import { ListCancelFarmComponent } from './list-cancel/listcancelfarm.component';
import { StaticFarmComponent } from './static-farm/static-farm.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { popUpSeed, SeedComponent } from './seed/seed.component';



@NgModule({
  declarations: [
    FarmLayoutComponent,
    InFoFarm,
    FruitComponent,
    HarvestComponent,
    ListWaitFarmComponent,
    ListSubmitFarmComponent,
    ListCancelFarmComponent,
    StaticFarmComponent,
    SeedComponent,
    popUpSeed,
  ],
  imports: [
    CommonModule,
    FarmRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe,{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
})
export class FarmModule { }
