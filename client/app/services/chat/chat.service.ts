import { Injectable } from '@angular/core';
import {SocketService} from "../socket/socket.service";
import {ChatMessage} from "./chat-message.model";
import {UserService} from "../user/user.service";

export class Chat {
  UserId: number;
  Messages: ChatMessage[] = [];
}

@Injectable()
export class ChatService {
  public chats: Chat[] = [];

  constructor(private socketService: SocketService, private userService: UserService) {
    this.socketService.subscribe('on.message').subscribe((msg: any) => {
      let message = new ChatMessage();

      message.Message = msg.Message;
      message.ReceivedAt = new Date(msg.Received);
      message.UserId = msg.UserId;

      let chat = this.chats.find((c) => c.UserId == message.UserId);

      if (chat == null) {
        chat = new Chat();
        chat.UserId = message.UserId;
        this.chats.push(chat);
      }

      chat.Messages.push(message);
    });

  }

  sendMessage(chat: Chat, message: string) {
    let packedMessage = {
      Message: message,
      UserId: chat.UserId
    };
    this.socketService.emit('message', packedMessage);

    let chatMessage = new ChatMessage();

    chatMessage.Message = message;
    chatMessage.ReceivedAt = new Date();
    chatMessage.UserId = this.userService.getLoggedInUser().Id;
    chat.Messages.push(chatMessage);
  }

  closeChat(chat: Chat) {
    this.chats.splice(this.chats.findIndex((c) => c == chat), 1);
  }

  addChat(userId: number) {
    let chat = new Chat();
    chat.UserId = userId;
    this.chats.push(chat);
  }

}
