import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService, Chat} from "../services/chat/chat.service";
import {AuthService} from "../services/user/auth.service";
import {Observable} from "rxjs";
import {User} from "../services/user/user";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  private chatsSub: Subscription = null;
  private chats: Chat[] = [];
  private loggedInUser: User;
  private isLoggedIn: boolean;

  constructor(private authService: AuthService, private chatService: ChatService) { }

  ngOnInit() {
    this.chatsSub = this.chatService.getChats()
      .subscribe((chats) => {
        this.chats = chats;
      });

    this.authService.getLoggedInUser()
      .subscribe((user) => {
        this.loggedInUser = user;
        if (user != null) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
    });
  }

  ngOnDestroy(): void {
    this.chatsSub.unsubscribe();
  }

}
