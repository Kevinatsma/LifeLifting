import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import { Location } from '@angular/common';
import { ChatThreadService } from './../chat-thread.service';
import { Observable } from 'rxjs';
import { Thread } from './../thread.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})

export class ChatDetailComponent implements AfterViewChecked, OnInit {
  @ViewChild('scroller') private feed: ElementRef;

  threads: Observable<Thread[]>;
  threadId: string;
  showThread: boolean;
  isMobile: boolean;

  constructor( public el: ElementRef,
               private location: Location,
               private threadService: ChatThreadService,
               private utils: UtilService,
               private route: ActivatedRoute,
               private router: Router) {
                 this.threadService.showThread.subscribe(thread => this.showThread = thread);
                 this.isMobile = this.utils.checkIfMobile();
               }

  ngAfterViewChecked() {
    if (!this.isMobile) {
      this.scrollToBottom();
    }
  }

  ngOnInit() {
    this.getThread();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.chat-feed');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  getThread() {
    this.threads = this.threadService.getThreads();
    this.threads.subscribe(thread => {
      thread.map(data => this.threadId = data.id);
    });
  }


  deleteChat() {
    const threadID = this.route.snapshot.paramMap.get('id');
    this.threadService.deleteThread(threadID);
    return this.router.navigate(['chat']);
  }

  showThreads() {
    this.threadService.showThread.next(true);
  }

  // delete() {
  //   this.threadService.deleteThread(this.threadId);
  // }

  goBack() {
    this.router.navigate(['dashboard']);
  }
}
