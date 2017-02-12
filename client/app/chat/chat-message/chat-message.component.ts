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

  public message: ChatMessage;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  isLoggedInUser(): boolean{
    return this.message.User.Id == this.userService.getLoggedInUser().Id;
  }

}
