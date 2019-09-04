import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';
import { LoaderService } from './services/loader/loader.service';
import { ToastService } from './services/toast/toast.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent  {
  userLogin : boolean = false;
  userData : any = {};
  
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
    private authService : AuthService,
    private loaderService : LoaderService,
    private toastService : ToastService
  ) {
    this.initializeApp();
    this.authService.loginStatusChange.subscribe(
      (resp) => {
        console.log(resp);
        if(resp) {
          this.userLogin = true;
          this.navCtrl.navigateForward('home');
          this.authService.checkLoggedIn().subscribe(
            (resp) => {
              console.log(resp);
              this.userData = resp;
            }
          )
        }
        else {
          this.userLogin = false
        }
      },
      (error) =>{
        this.userLogin = false;
      }
    )
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

  signout() {
    this.loaderService.presentLoading();
    this.authService.logout()
    .subscribe(
      (resp) => {
        this.authService.clearAuthorized();
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Logout Successfull');
        this.menuCtrl.close();
        this.navCtrl.navigateForward('landing-page');
      },
      (error) => {
        this.loaderService.dismissLoading();
      }
    )
  }

  
}
