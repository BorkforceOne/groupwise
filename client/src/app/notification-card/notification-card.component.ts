import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationModel} from "../services/notifications/notification.model";

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {
  @Input() public notification: NotificationModel;
  @Output() public close: EventEmitter<NotificationModel> = new EventEmitter<NotificationModel>();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit(this.notification);
  }

  onClick() {
    if (this.notification.OnClick !== undefined)
      this.notification.OnClick();
    this.close.emit(this.notification);
  }

}
