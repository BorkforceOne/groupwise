import { Component, OnInit } from '@angular/core';
import { SocketService } from "../services/socket/socket.service";
import {ChatMessage} from "../services/chat/chat-message.model";
import {User} from "../services/user/user";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private messages: ChatMessage[] = [];
  private  users: User[] = [];
  private inputMessage: string = '';


  constructor(private socketService: SocketService, private  userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
      });

    this.socketService.subscribe('on.message').subscribe((msg: any) => {
      let message = new ChatMessage();

      message.Message = msg.Message;
      message.ReceivedAt = new Date(msg.Received);
      let user = this.users.filter((entry) => {
        return entry.Id == msg.UserId;
      })[0];

      message.User = user;
      this.messages.push(message);
    });

  }

  sendMessage() {
   this.socketService.emit('message', this.inputMessage);
   this.inputMessage = "";
  }

}
