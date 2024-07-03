import { Injectable } from '@angular/core';
import { apiBaseUrl } from '../core/constants/api';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/auth';
import { tap } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${apiBaseUrl}/users`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly notificationService: NotificationService
  ) {}

  public getCurrentUser() {
    return this.httpClient.get<Account>(`${this.apiUrl}/me`).pipe(
      tap(_ => {
        this.notificationService.initializeHub();
      })
    );
  }
}
