import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { storageKeys } from '../../core/constants/localstorage';
import { CurrentUser } from '../../services/current-user.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss',
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly currentUserService: CurrentUser
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem(storageKeys.accessTokenKey, token);

        this.currentUserService.refreshUser().subscribe(() => {
          this.router.navigate(['/']).then(() => {});
        });
      }
    });
  }
}
