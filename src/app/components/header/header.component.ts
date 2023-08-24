import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../services/current-user.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public readonly currentUser: CurrentUser,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .subscribe(user => (this.currentUser.me = user));
  }
}
