import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http : HttpClient,
              private apiService : ApiService) { }
  
  getJobs() {
    return this.http.get(this.apiService.prepRoute('jobs_for_users'));
  }

  jobRequest(data) {
    return this.http.post(this.apiService.prepRoute('job_request'), data);
  }

  checkUserJob(date) {
    return this.http.get(this.apiService.prepRoute('check_user_job', {'date' : date}));
  }

  checkUserRequestJob(jobId) {
    return this.http.get(this.apiService.prepRoute('user_job_request', {'job_id' : jobId}));
  }

  userJobHistory() {
    return this.http.get(this.apiService.prepRoute('user_job_history'));
  }

  userJobSchedule() {
    return this.http.get(this.apiService.prepRoute('user_job_schedule'));
  }
}
