import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    private token: string = '';
    private tokenStatus: BehaviorSubject<string> = new BehaviorSubject<string>(this.token);
    tokenStatusChange = this.tokenStatus.asObservable();

    constructor(private storage: Storage) {
        this.storage.get('auth-token').then((tokenValue) => {
            if (tokenValue) {
                this.token = tokenValue;
                this.tokenStatus.next(this.token);
            }
        })
    }

    getToken() {
        return this.token;
    }

    setToken(v: string) {
        this.token = v;
        this.storage.set('auth-token', v);
        this.tokenStatus.next(v);
    }

    hasToken() {
        return this.token.length > 0;
    }

    clearToken() {
        this.storage.remove('auth-token');
        this.token = '';
        this.tokenStatus.next(null);
    }

}
