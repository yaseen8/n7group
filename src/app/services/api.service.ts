import { Injectable } from '@angular/core';
import {ConfigService} from "./config/config.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apiConf: ConfigService) { }
    prepRoute(p: string, q?: any) {
        return this.apiConf.prepRoute(p, q);
    }
}
