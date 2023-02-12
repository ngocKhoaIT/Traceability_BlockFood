import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NoticeDelete } from './base/notice-delete/notice-delete.component';

import { FarmLayoutComponent } from './manage-farm/layout/layout.component';
import { MerchantLayoutComponent } from './manage-merchant/layout/layout.component';
import { FactoryLayoutComponent } from './manage-factory/layout/layout.component';
import { TransportLayoutComponent } from './manage-transport/layout/layout.component';
import { StoreLayoutComponent } from './manage-store/layout/layout.component';
import { RetrievalComponent } from './view/retrieval/retrieval.component';
import { LayoutPageComponent } from './view/layout/layout.component';
import { DetailComponent } from './view/detail/detail.component';

import { AuthGuard } from './shared/auth.guard';
import { ContactComponent } from './view/contact/contact.component';
import { InformationComponent } from './view/information/information.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo:'pagelayout/page'
  },
  //Manage
  {
    path: 'login',
    component: LoginComponent,
  },
  //View
  {
    path: 'pagelayout',
    component: LayoutPageComponent,
    children: [
      {
        path: 'page',
        component: RetrievalComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'information',
        component: InformationComponent,
      },
  ]
  },
  //NoticeDelete
  {
    path: 'notice-delete',
    component: NoticeDelete
  },
  // Routes Admin
  {
    path: 'home/:id',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  
  // RoutesFarm
  {
    path: 'farmlayout/:id',
    component: FarmLayoutComponent,
    loadChildren: () => import('./manage-farm/farm.module').then(m => m.FarmModule),
    canActivate: [AuthGuard]
  },

  //RoutesMerchant
  {
    path: 'merchantlayout/:id',
    component: MerchantLayoutComponent,
    loadChildren: () => import('./manage-merchant/merchant.module').then(m => m.MerchantModule),
    canActivate: [AuthGuard]
  },

  //RoutesFactory
  {
    path: 'factorylayout/:id',
    component: FactoryLayoutComponent,
    loadChildren: () => import('./manage-factory/factory.module').then(m => m.FactoryModule),
    canActivate: [AuthGuard]
  },

  //RoutesTransport
  {
    path: 'transportlayout/:id',
    component: TransportLayoutComponent,
    loadChildren: () => import('./manage-transport/transport.module').then(m => m.TransportModule),
    canActivate: [AuthGuard]
  },

  //RoutesStore
  {
    path: 'storelayout/:id',
    component: StoreLayoutComponent,
    loadChildren: () => import('./manage-store/store.module').then(m => m.StoreModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
