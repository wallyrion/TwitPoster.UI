import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../services/current-user.service';
import { storageKeys } from '../../core/constants/localstorage';
import { googleClientId } from '../../core/constants/api';
import { HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/auth';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public account: Account | undefined;
  private googleClientId = googleClientId;

  constructor(
    public readonly currentUser: CurrentUser,
    private authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) {}

  @HostListener('window:load')
  onLoad() {
    // @ts-ignore
    google.accounts.id.initialize({
      context: 'signin',
      ux_mode: 'popup',
      client_id: this.googleClientId,
      auto_select: false,
      itp_support: true,
      cancel_on_tap_outside: true,

      // @ts-ignore
      callback: a => {
        this.authService
          .loginWithGoogle(a.credential)
          .pipe(switchMap(() => this.currentUser.refreshUser()))
          .subscribe();
      },
    });

    // @ts-ignore
    google.accounts.id.prompt();
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById('google-signin-container'),
      { theme: 'outline', size: 'large', width: '100%' }
    );
  }

  ngOnInit(): void {
    this.currentUser.refreshUser().subscribe(user => {
      this.account = user;
      console.log('user successfully initialized', user);

      if (user !== undefined) {
        this.snackBar.open(`Welcome back, ${user.firstName}`, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    });
  }

  logout() {
    localStorage.setItem(storageKeys.accessTokenKey, '');
    window.location.reload();
  }
}
