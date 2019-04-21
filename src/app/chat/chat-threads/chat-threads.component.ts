import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Thread } from './../thread.model';
import { ChatThreadService } from './../chat-thread.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatMessageService } from '../chat-message.service';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss']
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<Thread[]>;
  thread: Observable<Thread>;

  constructor( public route: ActivatedRoute,
               private threadService: ChatThreadService,
               public messageService: ChatMessageService,
               public router: Router
               ) {}

  ngOnInit() {
    this.threadService.getThreads();
    this.threads = this.threadService.threads;
  }

  linkToChild(thread) {
    const channelID = thread.id;
    const url = `chat/chat-detail/${channelID}`;
    this.messageService.getMessages(channelID);
    this.router.navigate([url]);
    this.setActiveThread(channelID);
    this.threadService.getThread(channelID);

    const data = {
      read: true
    };
    return this.threadService.updateThread(channelID, data);
  }

  setActiveThread(channelID) {
    const threadDiv = document.querySelectorAll('.thread-item');
    const threadDivActive = document.getElementById(`${channelID}`);
    threadDiv.forEach(function(el) {
      el.classList.remove('active');
    });
    threadDivActive.classList.add('active');
  }


}
