import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetStartedService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }
  
checkEmail(email) {
  return this.http.get(this.apiService.prepRoute('check_requested_email', {'email' : email}));
}
}
