import { Injectable } from '@angular/core';
import {SocketService} from "../socket/socket.service";
import {ChatMessage} from "./chat-message.model";
import {AuthService} from "../user/auth.service";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import * as _ from 'lodash';

export class Chat {
  UserId: number;
  private _messagesSubject: ReplaySubject<ChatMessage[]>;
  private _messages: ChatMessage[];

  constructor() {
    this._messagesSubject = new ReplaySubject(2);
    this._messages = [];
  }

  public addMessage(message: ChatMessage) {
    this._messages.push(message);
    this.emitChange();
  }

  public addMessages(messages: ChatMessage[]) {
    this._messages = this._messages.concat(messages);
    this._messages.sort((a, b) => <any>new Date(a.ReceivedAt) - <any>new Date(b.ReceivedAt));
    this.emitChange();
  }

  public getMessages(): Observable<ChatMessage[]> {
    return this._messagesSubject.asObservable();
  }

  public getMessagesRaw(): ChatMessage[] {
    return _.clone(this._messages);
  }

  private emitChange() {
    this._messagesSubject.next(_.clone(this._messages));
  }
}

@Injectable()
export class ChatService {
  private _chatsSubject: ReplaySubject<Chat[]>;
  private _chats: Chat[];

  constructor(private socketService: SocketService, private authService: AuthService) {
    this._chats = [];
    this._chatsSubject = new ReplaySubject(2);

    this.socketService.getSocket().subscribe((socket) => {
      this.socketService.subscribe(socket, 'on.message').subscribe((msg: any) => {
        let message = new ChatMessage();

        message.Message = msg.Message;
        message.ReceivedAt = new Date(msg.Received);
        message.UserId = msg.UserId;

        let chat = this._chats.find(c => c.UserId === message.UserId);
        if (!chat) {
          chat = this.addChat(message.UserId);
        }

        chat.addMessage(message);
      });

      this.socketService.subscribe(socket, 'on.message.history').subscribe((messages: any[]) => {
        if (messages.length === 0)
          return;

        let chat = this._chats.find(c => c.UserId === messages[0].To || c.UserId === messages[0].From);
        if (!chat)
          return;

        let currentMessages = chat.getMessagesRaw();

        let oldMessages = [];

        messages.forEach((message, i) => {
          if (currentMessages.findIndex((currentMessage) => currentMessage.Message === message.Message && currentMessage.UserId === message.From) !== -1)
            return;

          let chatMessage = new ChatMessage();

          chatMessage.Message = message.Message;
          chatMessage.ReceivedAt = message.createdAt;
          chatMessage.UserId = message.From;

          oldMessages.push(chatMessage);
        });

        chat.addMessages(oldMessages);
      });

      // Write history retreival
    });
  }

  getChats(): Observable<Chat[]> {
    return this._chatsSubject.asObservable()
  }

  sendMessage(chat: Chat, message: string) {
    let packedMessage = {
      Message: message,
      UserId: chat.UserId
    };
    this.socketService.emit('message', packedMessage);

    this.authService.getLoggedInUser()
      .subscribe((user) => {
        let chatMessage = new ChatMessage();

        chatMessage.Message = message;
        chatMessage.ReceivedAt = new Date();
        chatMessage.UserId = user.Id;
        chat.addMessage(chatMessage);
      });
  }

  closeChat(chat: Chat) {
    this._chats.splice(this._chats.findIndex(c => c === chat), 1);
    this.emitChange();
  }

  addChat(userId: number): Chat {
    if (!this._chats.find(c => c.UserId === userId)) {
      let chat = new Chat();
      chat.UserId = userId;
      this._chats.push(chat);
      this.requestChatHistory(userId);
      this.emitChange();
      return chat;
    }
    return null;
  }

  requestChatHistory(userId: number) {
    let packedMessage = {
      UserId: userId
    };

    this.socketService.emit('message.history', packedMessage);
  }

  private emitChange() {
    this._chatsSubject.next(_.clone(this._chats));
  }

}
