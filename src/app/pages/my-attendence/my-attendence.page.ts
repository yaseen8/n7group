import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { JobCheckInService } from '../../services/job-check-in/job-check-in.service';

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
              private jobCheckInService : JobCheckInService) { }

  ngOnInit() {
    this.getAttendence();
  }

  getAttendence() {
    // this.loaderService.presentLoading();
    this.jobCheckInService.getAttendenceRecord().subscribe(
      (resp : any) =>{
        // this.loaderService.dismissLoading();
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
        this.showData = false;
        this.showMessage = true;
      }
    )
  }

}
