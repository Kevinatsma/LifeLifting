import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import { Location } from '@angular/common';
import { ChatThreadService } from './../chat-thread.service';
import { Observable } from 'rxjs';
import { Thread } from './../thread.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})

export class ChatDetailComponent implements AfterViewChecked, OnInit {
  @ViewChild('scroller') private feed: ElementRef;

  threads: Observable<Thread[]>;
  threadId: string;

  constructor( public el: ElementRef,
               private location: Location,
               private threadService: ChatThreadService,
               private route: ActivatedRoute,
               private router: Router) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
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

  // delete() {
  //   this.threadService.deleteThread(this.threadId);
  // }

  goBack() {
    this.location.back();
  }
}
