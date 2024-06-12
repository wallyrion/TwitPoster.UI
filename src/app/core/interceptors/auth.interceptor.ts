import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { storageKeys } from '../constants/localstorage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string | null = localStorage.getItem(
      storageKeys.accessTokenKey
    ); // assuming token is stored in localStorage

    if (token) {
      // Clone the request and set the new header with the access token.
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });

      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
