import { Injectable } from '@angular/core';
import { Account } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class CurrentUser {
  private _me?: Account;

  public get me(): Account | undefined {
    return this._me;
  }

  public set me(currentUser: Account | undefined) {
    this._me = currentUser;
  }
}
