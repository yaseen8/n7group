import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpAuthInterceptor} from "./services/interceptor/http.auth.interceptor";
import {HttpAdditionalHeaderInterceptor} from "./services/interceptor/http-additional-header.interceptor";
import {HttpErrorInterceptor} from "./services/interceptor/http-error.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AttendenceDetailPage } from './pages/my-attendence/attendence-detail/attendence-detail.page';
import { FCM } from '@ionic-native/fcm/ngx';
import { JobDetailPage } from './pages/new-jobs/job-detail/job-detail.page';
import { YourJobsPage } from './pages/your-jobs/your-jobs.page';

@NgModule({
  declarations: [AppComponent, AttendenceDetailPage, JobDetailPage, YourJobsPage],
  entryComponents: [AttendenceDetailPage,JobDetailPage, YourJobsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpAdditionalHeaderInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
      Geolocation,
      Diagnostic,
      LocationAccuracy,
      NativeGeocoder,
      FCM
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
