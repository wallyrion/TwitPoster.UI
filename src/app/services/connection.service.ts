import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { apiBaseUrl } from '../core/constants/api';
import { storageKeys } from '../core/constants/localstorage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationPayload, NotificationType } from '../models/notifications';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private _hubConnection: HubConnection | undefined;

  constructor(public snackBar: MatSnackBar) {}

  initializeHub(): void {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .withUrl(`${apiBaseUrl}/progress`, {
        headers: {},
        accessTokenFactory: () =>
          localStorage.getItem(storageKeys.accessTokenKey) as string,
      })
      .build();

    this._hubConnection
      .start()
      .then(res =>
        console.log('started', res, this._hubConnection?.connectionId)
      )
      .catch(err => console.error(err.toString()));

    this._hubConnection.on(
      'SendNotification',
      (type: NotificationType, details: NotificationPayload) => {
        console.log('type ', type.toString());
        console.log('details ', details);

        const [message, action] = this.formatNotification(type, details);

        this.snackBar.open(message, action, {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 2000,
        });
      }
    );
  }

  private formatNotification = (
    type: NotificationType,
    details: NotificationPayload
  ): [string, string] => {
    if (type === NotificationType.likedPost) {
      return [`${details.byUserName} liked your post!`, '💜'];
    }

    return ['', ''];
  };
}
