import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }

  getUserProfile() {
    return this.http.get(this.apiService.prepRoute('get_user_profile'));
  }
}
