import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
export class ChatMessagesComponent implements OnInit, OnDestroy {
  navigationSubscription;
  messages$: Observable<Message[]>;
  channelId: Observable<string>;
  thread: Thread;

  constructor( private messageService: ChatMessageService,
               public threadService: ChatThreadService,
               private route: ActivatedRoute,
               public router: Router) { }

  ngOnInit() {
    // subscribe to the router events. Store the subscription so we can
   // unsubscribe later.
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
    this.messages$ = this.messageService.messages;
    console.log(this.messages$);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }


}
