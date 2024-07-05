import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CurrentUser } from '../../services/current-user.service';
import { storageKeys } from '../../core/constants/localstorage';
import { googleClientId } from '../../core/constants/api';
import { HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public account: Account | undefined;
  googleClientId = googleClientId;

  constructor(
    public readonly currentUser: CurrentUser,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  @HostListener('window:load')
  onLoad() {
    // @ts-ignore
    console.log('is window:load', google);
    // @ts-ignore
    google.accounts.id.initialize({
      context: 'signin',
      ux_mode: 'popup',
      client_id: googleClientId,
      login_url:
        'https://localhost:7267/Auth/google-sso?redirectTo=http://localhost:4200/auth-callback',
      auto_select: false,
      itp_support: true,
      cancel_on_tap_outside: true,

      // @ts-ignore
      callback: a => {
        console.log('success', a);
        this.authService.loginWithGoogle(a.credential).subscribe(res => {
          console.log('success', res);
          this.currentUser.refreshUser().subscribe();
          this.cd.detectChanges();
        });
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

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.currentUser.refreshUser().subscribe(user => {
      this.account = user;
      console.log('user successfully initialized', user);
    });
  }

  logout() {
    this.currentUser.me = undefined;
    localStorage.setItem(storageKeys.accessTokenKey, '');
    window.location.reload();
  }
}
