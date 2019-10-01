import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobCheckInService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }

  getJobDetail() {
    return this.http.get(this.apiService.prepRoute('check_user_today_job'));
  }

  getCheckInDetail(date) {
    return this.http.get(this.apiService.prepRoute('get_check_in_detail',{'date' : date}));
  }

  checkInUser(data) {
    return this.http.post(this.apiService.prepRoute('check_in_user'), data);
  }

  checkoutUser(data) {
    return this.http.post(this.apiService.prepRoute('check_out_user'), data);
  }

  getAttendenceRecord() {
    return this.http.get(this.apiService.prepRoute('get_attendence_record'));
  }
}
