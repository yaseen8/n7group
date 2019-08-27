import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent  {
  
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Account',
      url: '/my-account',
      icon: 'person'
    },
    {
      title: 'My Attendence',
      url: '/my-attendence',
      icon: 'finger-print'
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: 'chatboxes'
    }
  ];
  title:any;

  user={
    firstName: "John",
    lastName: "Smith",
    address: "1045 Aurora Blvd, Quezon City, 1109 Metro Manila, Philippines",
    timingFrom: "8:00 AM",
    timingTo: "6:00 PM"
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl : NavController,
    private menuCtrl : MenuController,
  ) {
    this.initializeApp();
  }


  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();
    });
  }

  goToSignIn() {
    this.menuCtrl.close();
    this.navCtrl.navigateForward('sign-in');
  }

  
}
