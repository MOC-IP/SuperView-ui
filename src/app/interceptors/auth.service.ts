import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('interceptor', req, localStorage.getItem('token'));
    req = req.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });

    return next.handle(req);
  }
}