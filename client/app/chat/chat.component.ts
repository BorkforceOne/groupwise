import { Component, OnInit } from '@angular/core';
import {ChatService, Chat} from "../services/chat/chat.service";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private chats: Chat[] = [];

  constructor(private userService: UserService, private chatService: ChatService) { }

  ngOnInit() {
    this.chats = this.chatService.chats;
  }

}
