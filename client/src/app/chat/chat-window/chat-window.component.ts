import {
  Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef,
  trigger, state, style, transition, animate, Input, OnDestroy
} from '@angular/core';
import {ChatService, Chat} from "../../services/chat/chat.service";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs/Subscription";
import {ChatMessage} from "../../services/chat/chat-message.model";

@Component({
  selector: 'app-chat-window',
  templateUrl: 'chat-window.component.html',
  styleUrls: ['chat-window.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('chatState', [
      state('inactive', style({
        backgroundColor: '#337ab7'
      })),
      state('ping',   style({
        backgroundColor: '#B77033'
      })),
      transition('inactive => ping', animate('100ms ease-in')),
      transition('ping => inactive', animate('1000ms ease-out'))
    ])
  ]
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  @ViewChild('body') private body: ElementRef;
  @Input() private chat: Chat;
  private collapsed: boolean = false;
  private Displayname: string;
  private message: string;
  private lastPosition: number;
  private lastScrollHeight: number;
  private chatState: string = 'active';
  private newMessage: boolean = false;
  private messageSub: Subscription = null;
  private messages: ChatMessage[] = [];

  constructor(private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserById(this.chat.UserId)
      .subscribe((user) => {
        this.Displayname = this.userService.getUserDisplayName(user);
      });

    this.messageSub = this.chat.getMessages()
      .subscribe((messages: ChatMessage[]) => {
        if (this.collapsed === true) {
          this.newMessage = true;
          this.chatState = 'ping';
        }
        this.messages = messages;
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      })
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
  }

  toggleCollapse() {
    if (this.newMessage === true)
      this.newMessage = false;

    this.collapsed = !this.collapsed;
  }

  close() {
    this.chatService.closeChat(this.chat);
  }

  sendMessage() {
    if (this.message.trim() != "") {
      this.chatService.sendMessage(this.chat, this.message);
      this.message = "";
    }
  }

  animationDone() {
    if (this.chatState === 'ping')
      this.chatState = 'inactive';
    else if (this.newMessage)
      this.chatState = 'ping';
  }

  scrollToBottom(): void {
    try {
      if (this.lastScrollHeight == this.lastPosition && this.body.nativeElement.scrollHeight != this.lastScrollHeight) {
        this.body.nativeElement.scrollTop = this.body.nativeElement.scrollHeight;
      }
      this.lastPosition = this.body.nativeElement.scrollTop + 250;
      this.lastScrollHeight = this.body.nativeElement.scrollHeight
    } catch(err) { }
  }

}
