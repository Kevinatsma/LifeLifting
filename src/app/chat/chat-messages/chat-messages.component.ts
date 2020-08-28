import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Message } from './../message.model';
import { ChatMessageService } from './../chat-message.service';
import { ChatThreadService } from '../chat-thread.service';
import { Thread } from '../thread.model';
import { UtilService } from './../../shared/services/util.service';
import * as _ from 'lodash';
import { distinctUntilChanged } from 'rxjs/operators';

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
               public router: Router,
               private utils: UtilService) { }

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
      this.messageSubscription$ = this.messages$.pipe(distinctUntilChanged()).subscribe(messages => {
        this.messages = messages.sort(function(a, b) {
          // convert date object into number to resolve issue in typescript
          return  +new Date(a.timestamp) - +new Date(b.timestamp);
        });

        const messageElements = document.querySelectorAll('.message');
          _.each(messageElements, (el: HTMLElement) => {
            if (!el.classList.contains('is-loaded')) {
              el.classList.add('is-loaded');
            }
          });
      });
    }
  }

  ngOnDestroy() {
    this.messages = null;
    this.navigationSubscription.unsubscribe();
    this.messageSubscription$.unsubscribe();
  }


}
