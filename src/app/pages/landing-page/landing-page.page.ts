import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }

  goToGetStarted() {
    this.navCtrl.navigateForward('get-started');
  }

  goToSignin() {
    this.navCtrl.navigateForward('sign-in');
  }
}
