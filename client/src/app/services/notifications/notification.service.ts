import {Injectable} from '@angular/core';
import {NotificationModel} from "./notification.model";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import {SocketService} from "../socket/socket.service";
import * as _ from 'lodash';
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {ChatService} from "../chat/chat.service";

@Injectable()
export class NotificationService {
  private _notifications = [];
  private _notificationsSubject: ReplaySubject<NotificationModel[]> = new ReplaySubject(2);

  constructor(private socketService: SocketService, private userService: UserService, private chatService: ChatService) {
    this.socketService.getSocket().subscribe((socket) => {
      this.socketService.subscribe(socket, 'on.notifications').subscribe((notifsIn: any[]) => {
        let notifs = [];

        notifsIn.forEach((notif) => {
          let notification = new NotificationModel();

          switch (notif.Type) {
            case 'MATCH_REQUEST':
              notification.createdAt = notif['createdAt'];
              this.userService.getUserById(notif['UserId'])
                .subscribe((user: User) => {
                  notification.Message = `New match request from ${this.userService.getUserDisplayName(user)}`;
                  notification.LinkTo = `/user-profile/${user.Id}`;
                });
              notifs.push(notification);
              break;

            case 'NEW_MESSAGE':
              notification.createdAt = notif['createdAt'];
              this.userService.getUserById(notif['UserId'])
                .subscribe((user: User) => {
                  notification.Message = `${notif['Count']} unseen message(s) from ${this.userService.getUserDisplayName(user)}`;
                  notification.OnClick = () => {
                    this.chatService.addChat(user.Id);
                  };
                });
              notifs.push(notification);
              break;

            case 'PENDING_USERS':
              notification.createdAt = notif['createdAt'];
              notification.Message = `${notif['Count']} new user(s) pending approval`;
              notification.LinkTo = `/admin-manage/review-queue`;
              notifs.push(notification);
              break;
          }
        });

        this._notifications = notifs;
        this.emitChange();
      });
    });
  }

  getNotifications(): Observable<NotificationModel[]> {
    this.requestNotifications();
    return this._notificationsSubject.asObservable();
  }

  requestNotifications(): void {
    this.socketService.emit('notifications', {});
  }

  private emitChange() {
    this._notificationsSubject.next(_.clone(this._notifications));
  }

}
