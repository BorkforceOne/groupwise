import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {ChatMessage} from "../../services/chat/chat-message.model";
import {UserService} from "../../services/user/user.service";
import {AuthService} from "../../services/user/auth.service";
import {User} from "../../services/user/user";

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
  private loggedInUser: User;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUserPhotosByUserId(this.message.UserId)
      .subscribe((photos) => {
        if (photos.length > 0)
          this.profileImage = this.photoURL + `/${photos[0].Id}`
      });
    this.authService.getLoggedInUser()
      .subscribe((user) => {
        this.loggedInUser = user;
      });
  }

  isLoggedInUser(): boolean {
    if (this.loggedInUser) {
      return this.message.UserId == this.loggedInUser.Id;
    }
    return false;
  }

}
