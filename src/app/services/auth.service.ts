import { Injectable } from '@angular/core';
import { apiBaseUrl } from '../core/constants/api';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../models/login';
import { tap } from 'rxjs';
import { storageKeys } from '../core/constants/localstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${apiBaseUrl}/auth`;

  constructor(private readonly httpClient: HttpClient) {}

  public login(request: LoginRequest) {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(loginResponse => {
          localStorage.setItem(
            storageKeys.accessTokenKey,
            loginResponse.accessToken
          );
        })
      );
  }

  public loginWithGoogle(credentialToken: string) {
    console.log('loginWithGoogle');
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login-google`, {
        Credential: credentialToken,
      })
      .pipe(
        tap(loginResponse => {
          localStorage.setItem(
            storageKeys.accessTokenKey,
            loginResponse.accessToken
          );
        })
      );
  }
}
