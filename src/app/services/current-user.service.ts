import { Injectable } from '@angular/core';
import { Account } from '../models/auth';
import { catchError, Observable, of, ReplaySubject, tap } from 'rxjs';
import { apiBaseUrl } from '../core/constants/api';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { UpdateUserProfileRequest } from '../models/user-requests';

@Injectable({
  providedIn: 'root',
})
export class CurrentUser {
  private readonly apiUrl = `${apiBaseUrl}/users`;

  private currentUserSubject = new ReplaySubject<Account>(1);
  private currentUser$: Observable<Account> =
    this.currentUserSubject.asObservable();
  private isRefreshing = false;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly notificationService: NotificationService
  ) {}

  private _me?: Account;

  public get me(): Account | undefined {
    return this._me;
  }

  public set me(currentUser: Account | undefined) {
    this._me = currentUser;
  }

  public refreshUser(): Observable<Account> {
    if (this.isRefreshing) {
      return this.currentUser$;
    }

    this.isRefreshing = true;
    this.httpClient
      .get<Account>(`${this.apiUrl}/me`)
      .pipe(
        tap(res => {
          this.currentUserSubject.next(res);
          this.me = res;
          this.notificationService.initializeHub();
          this.isRefreshing = false;
        }),
        catchError(() => {
          this.isRefreshing = false;
          return of(undefined);
        })
      )
      .subscribe();

    return this.currentUser$;
  }

  public updateProfile(data: UpdateUserProfileRequest) {
    return this.httpClient.put<undefined>(`${this.apiUrl}/profile`, data);
  }
}
