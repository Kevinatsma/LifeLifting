import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Message } from './../message.model';
import { ChatMessageService } from './../chat-message.service';
import { ChatThreadService } from '../chat-thread.service';
import { Thread } from '../thread.model';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  messages$: Observable<Message[]>;
  messageSubscription$: Subscription;
  messages: Message[];
  channelId: Observable<string>;
  thread: Thread;

  constructor( private messageService: ChatMessageService,
               public threadService: ChatThreadService,
               private route: ActivatedRoute,
               public router: Router) { }

  ngOnInit() {
    this.getMessages();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getMessages();
      }
    });
  }

  getMessages() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.messages$ = this.messageService.getMessages(id);
      this.messageSubscription$ = this.messages$.subscribe(messages => {
        this.messages = messages;
      });
    }
  }

  ngOnDestroy() {
    this.messages = null;
    this.navigationSubscription.unsubscribe();
    this.messageSubscription$.unsubscribe();
  }


}
