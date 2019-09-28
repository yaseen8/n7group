import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from '../../../services/loader/loader.service';
import { JobsService } from '../../../services/jobs/jobs.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {
  detail : any = {};
  appliedForJob : boolean = true;

  constructor(private modalCtrl : ModalController,
              private navParams : NavParams,
              private loaderService : LoaderService,
              private jobService : JobsService,
              private toastService : ToastService) {
                this.detail = navParams.get('data');
                this.checkUserRequestThisJob();
               }

  ngOnInit() {
  }

  checkUserRequestThisJob(){
    console.log(this.detail.id);
    this.jobService.checkUserRequestJob(this.detail.id).subscribe(
      (resp) => {
        if(resp) {
          this.appliedForJob = true;
        }
        else {
          this.appliedForJob = false;
        }
      },
      (error) => {
      }
    )
  }

  checkUserJob() {
    this.loaderService.presentLoading();
    this.jobService.checkUserJob(this.detail.date).subscribe(
      (resp : any) => {
        this.loaderService.dismissLoading();
        if(resp.length) {
          this.toastService.presentToast('You already have job on this date.');
        }
        else {
          this.request();
        }
      },
      (error) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Something went wrong while checking job, please try again');
      }
    )
  }

  request() {
    let data = {
      'job_id' : this.detail.id
    }
    this.loaderService.presentLoading();
    this.jobService.jobRequest(data).subscribe(
      (resp) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Your request is successfully send.');
        this.modalCtrl.dismiss();
      },
      (error) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Something went wrong while requesting job, please try again');
      }
    )
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
