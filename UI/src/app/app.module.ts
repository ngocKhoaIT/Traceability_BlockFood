import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

import { CKEditorModule } from 'ckeditor4-angular';
import { InterceptorService } from './services/interceptor.service';

import { WebcamModule } from 'ngx-webcam';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NoticeDelete } from './base/notice-delete/notice-delete.component';

import { RetrievalComponent } from './view/retrieval/retrieval.component';
import { LayoutPageComponent } from './view/layout/layout.component';
import { DetailComponent } from './view/detail/detail.component';
import {DatePipe} from '@angular/common';

import { NoticeReceiveComponent } from './base/notice-receive/notice-receive.component';
import { NoticeSendComponent } from './base/notice-send/notice-send.component';
import { SendComponent } from './base/send/send.component';
import { NoticeViewComponent } from './base/notice-view/notice-view.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    NotFoundComponent,
    NoticeDelete,

    LayoutPageComponent,
    DetailComponent,
    RetrievalComponent,


    NoticeReceiveComponent,
    NoticeSendComponent,
    SendComponent,
    NoticeViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    WebcamModule,
    NgxScannerQrcodeModule
  ],
  providers: [DatePipe,{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
