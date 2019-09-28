import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../services/jobs/jobs.service';
import { LoaderService } from '../../../services/loader/loader.service';

@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.page.html',
  styleUrls: ['./job-history.page.scss'],
})
export class JobHistoryPage implements OnInit {
  historyList : any = [];
  showData : boolean = true;
  showMessage : boolean = false;

  constructor(private jobService : JobsService,
              private loaderService : LoaderService) {
                
               }

  ngOnInit() {
    this.getJobHistory();
  }

  getJobHistory() {
    this.loaderService.presentLoading();
    this.jobService.userJobHistory().subscribe(
      (resp) => {
        this.loaderService.dismissLoading();
        this.historyList = resp;
        if(this.historyList.length) {
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
