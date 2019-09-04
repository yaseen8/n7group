import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    // private webRoot: string = 'http://127.0.0.1:8000/api/';
    private webRoot: string = 'http://www.alphazzz.com/n7/public/api/';


  constructor() { }
    prepRoute(path: string, q?: any) {
        let query = '';
        if (q) {
            query = '?';
            let c = 0;
            for (let key in q) {
                if (c > 0) {
                    query += '&';
                }
                if (q[key]) {
                    query += key + '=' + q[key];
                }
                c++;
            }
        }

        return this.webRoot + path + query;
    }
}
