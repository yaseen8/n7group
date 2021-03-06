import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { JobCheckInService } from '../../services/job-check-in/job-check-in.service';
import { ModalController } from '@ionic/angular';
import { AttendenceDetailPage } from './attendence-detail/attendence-detail.page';

@Component({
  selector: 'app-my-attendence',
  templateUrl: './my-attendence.page.html',
  styleUrls: ['./my-attendence.page.scss'],
})
export class MyAttendencePage implements OnInit {
  attendenceRecord : any = [];
  showData : boolean = true;
  showMessage : boolean = false;

  constructor(private loaderService : LoaderService,
              private jobCheckInService : JobCheckInService,
              private modalController : ModalController) { }

  ngOnInit() {
    this.getAttendence();
  }

  getAttendence() {
    this.loaderService.presentLoading();
    this.jobCheckInService.getAttendenceRecord().subscribe(
      (resp : any) =>{
        this.loaderService.dismissLoading();
        if(resp.length) {
          this.attendenceRecord = resp;
          this.showData = true;
          this.showMessage = false;
        }
        else {
          this.showData  = false;
          this.showMessage = true;
        }
      },
      (error) => {
        this.loaderService.dismissLoading();
        this.showData = false;
        this.showMessage = true;
      }
    )
  }

  async showDetail(data) {
    const modal = await this.modalController.create({
        component: AttendenceDetailPage,
        componentProps : {
          'data' : data
        }
    });

    return await modal.present();
  
}

}
