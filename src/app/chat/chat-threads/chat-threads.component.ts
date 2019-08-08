import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { Thread } from './../thread.model';
import { ChatThreadService } from './../chat-thread.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatMessageService } from '../chat-message.service';
import { ChatDetailComponent } from '../chat-detail/chat-detail.component';
import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss']
})
export class ChatThreadsComponent implements OnInit, OnDestroy {
  @ViewChild(ChatDetailComponent) chatComp: ChatDetailComponent;
  threads: Observable<Thread[]>;
  thread: Observable<Thread>;
  showThreads: boolean;
  showThreads$: Subscription;
  activeThreadID: string;
  activeThread$: Subscription;
  isMobile: boolean;

  constructor( public route: ActivatedRoute,
               private threadService: ChatThreadService,
               public messageService: ChatMessageService,
               private utils: UtilService,
               public router: Router
               ) {
                 this.showThreads$ = this.threadService.showThread.subscribe(showThread => this.showThreads = showThread);
                 this.activeThread$ = this.threadService.activeThreadID.subscribe(id => {
                   this.activeThreadID = id;
                   this.setActiveThread(id);
                 });
                 this.threadService.showThread.next(true);
                 this.isMobile = this.utils.checkIfMobile();
               }

  ngOnInit() {
    this.threadService.getThreads();
    this.loadThreads();
  }

  ngOnDestroy() {
    this.showThreads$.unsubscribe();
  }

  async loadThreads() {
    this.threads = await this.threadService.threads;
    setTimeout(() => {
      const threadDivs = document.querySelectorAll('.thread-item');
      threadDivs.forEach(el => {
        el.classList.add('is-loading');
      });

      // Remove animation
      setTimeout(() => {
        threadDivs.forEach(el => {
          el.classList.remove('is-loading');
        });
      }, 3000);
    });
  }

  linkToChild(thread) {
    const channelID = thread.id;
    const url = `chat/chat-detail/${channelID}`;
    this.messageService.getMessages(channelID);
    this.threadService.getThread(channelID);
    this.router.navigate([url]);
    this.threadService.getThread(channelID);

    if (this.chatComp) {
      this.chatComp.getThread();
    }

    const data = {
      unreadMessages: 0
    };
    return this.threadService.updateThread(channelID, data);
  }

  setActiveThread(channelID) {
    const threadDiv = document.querySelectorAll('.thread-item');
    setTimeout(() => {
      const threadDivActive = document.getElementById(`${channelID}`);
      threadDiv.forEach(function(el) {
        el.classList.remove('active');
      });
      threadDivActive.classList.add('active');
    }, 500);
  }

  hideThreads() {
    if (this.isMobile) {
      this.threadService.showThread.next(false);
    }
  }

  showChatThreads() {
    this.threadService.showThread.next(true);
    setTimeout(() => this.chatComp.scrollToBottom(), 800);
  }

  goToDashboard() {
    this.router.navigate(['../../../dashboard']);
  }
}
