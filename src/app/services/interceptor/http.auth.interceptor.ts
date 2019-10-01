import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../auth/token.service";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.tokenService.getToken()) {
            const authToken = 'Bearer ' + this.tokenService.getToken();
            const authReq = req.clone({setHeaders: {Authorization: authToken}});
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
