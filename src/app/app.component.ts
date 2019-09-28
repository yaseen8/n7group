import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';
import { LoaderService } from './services/loader/loader.service';
import { ToastService } from './services/toast/toast.service';
import { FCM } from '@ionic-native/fcm/ngx';

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
      title: 'New Jobs',
      url: '/new-jobs',
      icon: 'briefcase'
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
    },
    {
      title: 'Your Jobs',
      url: '/your-jobs',
      icon: 'chatboxes'
    },
    {
      title: 'My Account',
      url: '/my-account',
      icon: 'person'
    },
  ];
  title:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl : NavController,
    private menuCtrl : MenuController,
    private authService : AuthService,
    private loaderService : LoaderService,
    private toastService : ToastService,
    private fcm : FCM
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
              this.notification();
              
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

  notification() {
    this.fcm.getToken();
    this.fcm.subscribeToTopic('jobs');
    
    this.fcm.onNotification().subscribe(data => {
      alert(JSON.stringify(data));
      if(data.wasTapped){
        console.log("Received in background");
        alert(JSON.stringify(data));
      } else {
        alert(JSON.stringify(data));
        console.log("Received in foreground");
      };
    });
    
    this.fcm.onTokenRefresh();
  }

  
}
