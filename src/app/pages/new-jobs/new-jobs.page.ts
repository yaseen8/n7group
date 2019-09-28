import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs/jobs.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ModalController } from '@ionic/angular';
import { JobDetailPage } from './job-detail/job-detail.page';

@Component({
  selector: 'app-new-jobs',
  templateUrl: './new-jobs.page.html',
  styleUrls: ['./new-jobs.page.scss'],
})
export class NewJobsPage implements OnInit {
  jobsList: any = [];
  showData : boolean = true;
  showMessage : boolean = false;
  constructor(private jobsService : JobsService,
              private loaderService : LoaderService,
              private modalController : ModalController) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.loaderService.presentLoading();
    this.jobsService.getJobs().subscribe(
      (resp) => {
        this.loaderService.dismissLoading();
        this.jobsList = resp;
        if(this.jobsList.length) {
          this.showMessage = false;
          this.showData = true;
        }
        else {
          this.showData = false;
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
        component: JobDetailPage,
        componentProps : {
          'data' : data
        }
    });

    return await modal.present();
  
}

}
