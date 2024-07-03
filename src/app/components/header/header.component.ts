import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../services/current-user.service';
import { UserService } from '../../services/user.service';
import { storageKeys } from '../../core/constants/localstorage';
import {
  apiBaseUrl,
  clientAppUrl,
  googleClientId,
} from '../../core/constants/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  googleClientId = googleClientId;
  googleSignInUrl = `${apiBaseUrl}/auth/google-sso?redirectTo=${clientAppUrl}/auth-callback`;

  constructor(
    public readonly currentUser: CurrentUser,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser.me = user;
    });
  }

  logout() {
    this.currentUser.me = undefined;
    localStorage.setItem(storageKeys.accessTokenKey, '');
    window.location.reload();
  }
}
