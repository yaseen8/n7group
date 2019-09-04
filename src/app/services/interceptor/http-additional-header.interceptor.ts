import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class HttpAdditionalHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const updatedReq = req.clone({
      setHeaders: {
        'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
		'app' : 'mobile'
      }
    });
    return next.handle(updatedReq);
  }

}
