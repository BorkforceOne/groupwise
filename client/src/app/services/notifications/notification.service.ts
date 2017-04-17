import {Injectable} from '@angular/core';
import {NotificationModel} from "./notification.model";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NotificationService {
  private _notifications: ReplaySubject<NotificationModel> = new ReplaySubject(null);

  constructor() {
    let notif = new NotificationModel();
    notif.Message = "New user pending review!";
    notif.createdAt = new Date().toISOString();
    this._notifications.next(notif);

    setTimeout(() => {
      let notif = new NotificationModel();
      notif.Message = "New user pending review!";
      notif.createdAt = new Date().toISOString();
      this._notifications.next(notif);
    }, 1000);

  }

  getNotifications(): Observable<NotificationModel> {
    return this._notifications.asObservable();
  }

}
