import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-attendence-detail',
  templateUrl: './attendence-detail.page.html',
  styleUrls: ['./attendence-detail.page.scss'],
})
export class AttendenceDetailPage implements OnInit {
  detail : any = {};

  constructor(private navParams : NavParams,
             private modalCtrl : ModalController) {
    this.detail = navParams.get('data');
   }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
