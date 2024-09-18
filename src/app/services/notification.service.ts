import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as signalR from '@microsoft/signalr';
import { storageKeys } from '../core/constants/localstorage';
import { NotificationPayload, NotificationType } from '../models/notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _hubConnection: HubConnection;

  constructor(private readonly snackBar: MatSnackBar) {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .withUrl(`http://localhost:5000/messages`, {
        headers: {},
        accessTokenFactory: () =>
          localStorage.getItem(storageKeys.accessTokenKey) as string,
      })
      .build();
  }

  initializeHub(): void {
    if (this._hubConnection.connectionId) {
      this._hubConnection
        .stop()
        .then(() => console.log('stopped hub connection'));
    }

    this._hubConnection
      .start()
      .then(res =>
        console.log('started', res, this._hubConnection.connectionId)
      )
      .catch(err => console.error(err.toString()));

    this._hubConnection.on(
      'SendNotification',
      (type: NotificationType, details: NotificationPayload) => {
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
