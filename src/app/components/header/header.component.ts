import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CurrentUser } from '../../services/current-user.service';
import { storageKeys } from '../../core/constants/localstorage';
import { googleClientId } from '../../core/constants/api';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/auth';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

declare global {
  interface Window {
    google: typeof import('google-one-tap');
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('google_signin_container', { static: false })
  googleSignInContainer!: ElementRef;

  public account: Account | undefined;
  private googleClientId = googleClientId;

  constructor(
    public readonly currentUser: CurrentUser,
    private authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) {}

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngAfterViewInit() {
    // Initialize Google Sign-In only after the view (and container) is initialized
    this.initializeGoogleSignIn();
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

    this.initializeGoogleLibrary();
  }

  initializeGoogleLibrary() {
    if (typeof google !== 'undefined' && google.accounts) {
      this.initializeGoogleSignIn();
    } else {
      this.loadGoogleScript();
    }
  }

  loadGoogleScript() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      this.initializeGoogleSignIn();
    };

    script.onerror = () => {
      console.error('Failed to load the Google Sign-In library.');
      this.snackBar.open('Google Sign-In could not be initialized.', 'Close', {
        duration: 3000,
      });
    };

    document.body.appendChild(script);
  }

  initializeGoogleSignIn() {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        context: 'signin',
        ux_mode: 'popup',
        client_id: this.googleClientId,
        auto_select: false,
        itp_support: true,
        cancel_on_tap_outside: true,

        callback: a => {
          this.authService
            .loginWithGoogle(a.credential)
            .pipe(switchMap(() => this.currentUser.refreshUser()))
            .subscribe();
        },
      });

      // The view is guaranteed to be initialized now
      google.accounts.id.renderButton(
        this.googleSignInContainer.nativeElement,
        {
          theme: 'outline',
          size: 'small',
        }
      );

      google.accounts.id.prompt();
    } else {
      console.error('Google library failed to load.');
    }
  }

  logout() {
    localStorage.setItem(storageKeys.accessTokenKey, '');
    window.location.reload();
  }
}
