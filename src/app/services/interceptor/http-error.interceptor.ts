import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Storage } from "@ionic/storage";
import { NavController } from '@ionic/angular';



@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private storage : Storage,
                private navCtrl : NavController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.storage.clear();
                this.navCtrl.navigateForward('sign-in');
                
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}