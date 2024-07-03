import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { storageKeys } from '../../core/constants/localstorage';
import { UserService } from '../../services/user.service';
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
    private userService: UserService,
    private readonly currentUserService: CurrentUser
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem(storageKeys.accessTokenKey, token);

        this.userService.getCurrentUser().subscribe(currentUser => {
          this.currentUserService.me = currentUser;
          this.router.navigate(['/']).then(() => {});
        });
      }
    });
  }
}
