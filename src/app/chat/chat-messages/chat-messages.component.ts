import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Message } from './../message.model';
import { ChatMessageService } from './../chat-message.service';
import { ChatThreadService } from '../chat-thread.service';
import { Thread } from '../thread.model';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {
  messages: Observable<Message[]>;
  channelId: Observable<string>;
  thread: Thread;

  constructor( private messageService: ChatMessageService,
               public threadService: ChatThreadService,
               private route: ActivatedRoute ) { }

  ngOnInit() {
    this.getThread();
    // this.messages.subscribe();
    // this.channelId = this.route.snapshot.paramMap.get('id').subscribe();
  }

  getThread() {
    const channelId = this.route.snapshot.paramMap.get('id');
    console.log(channelId);
    this.threadService.getThread(channelId);
    this.threadService.thread.pipe().subscribe(thread => {
      console.log(thread);
      this.thread = thread;
      return this.getMessages(thread);
    });
  }

  async getMessages(thread) {
    // const messagesId = this.threadService.thread.id;
    this.messages = await this.messageService.getMessages(thread.id);
  }


}
