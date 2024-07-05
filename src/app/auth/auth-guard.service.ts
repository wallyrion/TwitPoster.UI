import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CurrentUser } from '../services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: CurrentUser,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return (
      !!this.authService.me ||
      this.authService.refreshUser().pipe(
        switchMap(res => {
          if (res == undefined) {
            this.router.navigate(['/login']);
          }

          return of(!!res);
        })
      )
    );
  }
}
