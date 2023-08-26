import { Injectable } from '@angular/core';
import { apiBaseUrl } from '../core/constants/api';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../models/login';
import { Account } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${apiBaseUrl}/auth`;

  private _currentUser?: Account;

  constructor(private readonly httpClient: HttpClient) {}

  public login(request: LoginRequest) {
    return this.httpClient.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request,
      {
        headers: {},
      }
    );
  }

  public get currentUser(): Account | undefined {
    return this._currentUser;
  }

  public set currentUser(currentUser: Account) {
    this._currentUser = currentUser;
  }
}
