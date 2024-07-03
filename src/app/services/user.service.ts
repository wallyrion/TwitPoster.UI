import { Injectable } from '@angular/core';
import { apiBaseUrl } from '../core/constants/api';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/auth';
import { tap } from 'rxjs';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${apiBaseUrl}/users`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly connection: ConnectionService
  ) {}

  public getCurrentUser() {
    return this.httpClient.get<Account>(`${this.apiUrl}/me`).pipe(
      tap(res => {
        console.log('used is initialized');
        this.connection.initializeHub();
      })
    );
  }
}
