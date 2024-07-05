import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CurrentUser } from '../services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: CurrentUser) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return (
      !!this.authService.me ||
      this.authService.refreshUser().pipe(switchMap(() => of(true)))
    );
  }
}
