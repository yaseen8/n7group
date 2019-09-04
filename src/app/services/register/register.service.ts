import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }
  
  getCompanyList() {
    return this.http.get(this.apiService.prepRoute('get_company_list'));
  }

  register(data) {
    return this.http.post(this.apiService.prepRoute('register'), data);
  }

  checkUserEmail(email) {
    return this.http.get(this.apiService.prepRoute('check_user_email', {'email' : email}));
  }
}
