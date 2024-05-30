import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenService } from './token.service';
import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
        private loginService: LoginService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        
        if (token) {
          if (this.loginService.checkTokenExpired()) {
            return EMPTY;
        }

            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }

}
