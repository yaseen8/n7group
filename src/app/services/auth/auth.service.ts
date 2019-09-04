import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {TokenService} from "./token.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public userId: string = '';
    public userData: any;

    private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loginStatusChange = this.loginStatus.asObservable();
    private userIdStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    userIdChange = this.userIdStatus.asObservable();
    private userDataStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    userDataChange = this.userDataStatus.asObservable();

  constructor(private apiService : ApiService,
              private tokenService : TokenService,
              private http : HttpClient) {
              this.tokenService.tokenStatusChange.subscribe((token) => {
                  if (token) {
                      this.loginStatus.next(true);
                  } else {
                      this.loginStatus.next(false);
                  }
              })
  }

    login(credentials: any) {
        return this.http.post(this.apiService.prepRoute('login'), credentials);
    }

    isAuthenticated() {
        return this.tokenService.hasToken();
    }

    setUserId(id) {
        this.userId = id;
        this.userIdStatus.next(true);
    }

    getUserId() {
        return this.userId;
    }

    setUserData(data) {
        this.userData = data;
        this.userDataStatus.next(true);
    }

    getUserName() {
        return this.userData['username'];
    }

    clearAuthorized() {
        this.tokenService.clearToken();
    }

    checkLoggedIn(){
        return this.http.get(this.apiService.prepRoute('logged_in_user'));
    }

    logout() {
        return this.http.post(this.apiService.prepRoute('logout'), {});
    }
}
