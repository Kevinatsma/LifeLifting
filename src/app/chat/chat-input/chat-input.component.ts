import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './../../core/auth/auth.service';
import { ChatMessageService } from './../chat-message.service';

import { Message } from './../message.model';
import { ChatThreadService } from '../chat-thread.service';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  @Input() user: User;
  message: string;

  constructor( private route: ActivatedRoute,
               private messageService: ChatMessageService,
               private auth: AuthService,
               private threadService: ChatThreadService,
               private userService: UserService ) { }

  send() {
    const channelId = this.route.snapshot.paramMap.get('id');
    const photoURL = this.user.photoURL;
    const sender = this.auth.authState.displayName || this.auth.authState.email;
    const senderId = this.auth.currentUserId;
    const message = this.message;
    this.messageService.sendMessage(channelId, photoURL, sender, senderId, message);
    this.messageService.getMessages(channelId);
    this.saveLast(channelId, message);
    return this.message = '';
  }

  saveLast(channelId, message) {
    this.threadService.saveLastMessage(channelId, message);
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
