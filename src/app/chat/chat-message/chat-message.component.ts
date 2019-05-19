import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from './../message.model';
import { AuthService } from './../../core/auth/auth.service';
import { ChatMessageService } from '../chat-message.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  convertedTimestamp: Date;

  incoming: boolean;

  constructor( private auth: AuthService,
               private messageService: ChatMessageService) {
                setTimeout(() => this.getTimestamp(), 300);
              }

  ngOnInit() {
    this.checkIncoming();
  }

  checkIncoming() {
    const user = this.auth.currentUserId;
    if (this.message.sender && user) {
      this.incoming = this.message.senderId !== user;
    }
  }

  getTimestamp() {
    this.convertedTimestamp = new Date(this.message.timestamp);
  }

}
