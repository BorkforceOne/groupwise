import { Component, OnInit } from '@angular/core';
import { SocketService } from "../services/socket/socket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages = [];
  message;

  constructor(private socketService: SocketService) { }

  ngOnInit() {

    this.socketService.subscribe('on.message').subscribe(message => {
      this.messages.push(message);
    });

  }

  sendMessage() {
    this.socketService.emit('message', this.message);
    this.message = "";
  }

}
