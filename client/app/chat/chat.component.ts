import { Component, OnInit } from '@angular/core';
import {ChatService, Chat} from "../services/chat/chat.service";
import {AuthService} from "../services/user/auth.service";
import {Observable} from "rxjs";
import {User} from "../services/user/user";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private chats: Chat[] = [];
  private loggedInUser: Observable<User>;
  private isLoggedIn: boolean;

  constructor(private authService: AuthService, private chatService: ChatService) { }

  ngOnInit() {
    this.chats = this.chatService.chats;
    this.loggedInUser = this.authService.getLoggedInUser();
    this.loggedInUser.subscribe((user) => {
      if (user != null) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

}
