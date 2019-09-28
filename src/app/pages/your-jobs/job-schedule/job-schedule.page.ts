import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../services/jobs/jobs.service';
import { LoaderService } from '../../../services/loader/loader.service';

@Component({
  selector: 'app-job-schedule',
  templateUrl: './job-schedule.page.html',
  styleUrls: ['./job-schedule.page.scss'],
})
export class JobSchedulePage implements OnInit {
  showData : boolean = true;
  showMessage : boolean = false;
  scheduleList : any = [];

  constructor(private jobService : JobsService,
              private loaderService : LoaderService) {
                
               }

  ngOnInit() {
    this.getJobHistory();
  }

  getJobHistory() {
    this.loaderService.presentLoading();
    this.jobService.userJobSchedule().subscribe(
      (resp) => {
        this.loaderService.dismissLoading();
        this.scheduleList = resp;
        if(this.scheduleList.length) {
          this.showMessage = false;
          this.showData = true;
        }
        else {
          this.showData = false;
          this.showMessage = true;
        }
      },
      (error)=> {
        this.loaderService.dismissLoading();
      }
    )
  }

}
