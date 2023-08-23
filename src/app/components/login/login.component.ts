import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CurrentUser} from "../../services/current-user.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {storageKeys} from "../../core/constants/localstorage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
      private readonly fb: FormBuilder,
      private readonly router: Router,
      private readonly authService: AuthService,
      private readonly userService: UserService,
      private readonly currentUserService: CurrentUser) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid){
      return;
    }

    const loginValues = this.loginForm.value;

    this.authService.login(loginValues)
        .subscribe(res => {
          console.log(res)

          localStorage.setItem(storageKeys.accessTokenKey, res.accessToken)
          this.userService.getCurrentUser().subscribe(currentUser => {
            this.currentUserService.me = currentUser;
            this.router.navigate(['/'])
          })
        })
  }
}
