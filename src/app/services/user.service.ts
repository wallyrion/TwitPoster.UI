import { Injectable } from '@angular/core';
import { apiBaseUrl } from '../core/constants/api';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${apiBaseUrl}/users`;

  constructor(private readonly httpClient: HttpClient) {}

  public getCurrentUser() {
    return this.httpClient.get<Account>(`${this.apiUrl}/me`);
  }

  public getProfileImage(userId: number) {
    return this.httpClient
      .get(`${this.apiUrl}/${userId}/photo`, {
        responseType: 'blob',
      })
      .pipe(
        map(data => {
          if (!data) {
            return undefined;
          }

          const blob = new Blob([data], { type: 'image/jpeg' });

          return URL.createObjectURL(blob);
        })
      );
  }
}
