import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {ChatService, Chat} from "../../services/chat/chat.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-chat-window',
  templateUrl: 'chat-window.component.html',
  styleUrls: ['chat-window.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  inputs: ['Chat']
})
export class ChatWindowComponent implements OnInit {
  @ViewChild('body') private body: ElementRef;
  private collapsed: boolean = false;
  private Chat: Chat;
  private Displayname: string;
  private message: string;

  constructor(private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserById(this.Chat.UserId)
      .subscribe((user) => {
        this.Displayname = `${user.Firstname} ${user.Lastname}`;
      });
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  close() {
    this.chatService.closeChat(this.Chat);
  }

  sendMessage() {
    this.chatService.sendMessage(this.Chat, this.message);
    this.message = "";
  }

  scrollToBottom(): void {
    try {
      this.body.nativeElement.scrollTop = this.body.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
