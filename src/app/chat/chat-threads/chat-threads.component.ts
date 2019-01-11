import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Thread } from './../thread.model';
import { ChatThreadService } from './../chat-thread.service';
import { Router } from '@angular/router';
import { ChatMessageService } from '../chat-message.service';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss']
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<Thread[]>;
  thread: Observable<Thread>;

  constructor(private threadService: ChatThreadService,
               public router: Router) {}

  ngOnInit() {
    this.threads = this.threadService.getThreads();
  }

  linkToChild(thread) {
    console.log(thread);
    const id = thread.id;
    const url = `chat/chat-detail/${id}`;
    this.router.navigate([url]);
    return this.threadService.getThread(id);
  }


}
