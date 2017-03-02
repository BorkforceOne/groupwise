import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {ChatMessage} from "../../services/chat/chat-message.model";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-chat-message',
  templateUrl: 'chat-message.component.html',
  styleUrls: ['chat-message.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  inputs: ['message']
})
export class ChatMessageComponent implements OnInit {
  private defaultPhotoURL: string = "/assets/profile-placeholder-default.png";
  private photoURL: string = "/api/v1/user-photos";
  private profileImage: string = this.defaultPhotoURL;
  private message: ChatMessage;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserPhotosByUserId(this.message.UserId)
      .subscribe((photos) => {
        if (photos.length > 0)
          this.profileImage = this.photoURL + `/${photos[0].Id}`
      })
  }

  isLoggedInUser(): boolean{
    return this.message.UserId == this.userService.getLoggedInUser().Id;
  }

}
