import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import { Location } from '@angular/common';
import { ChatThreadService } from './../chat-thread.service';
import { Observable } from 'rxjs';
import { Thread } from './../thread.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../shared/services/util.service';
import { AuthService } from './../../core/auth/auth.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})

export class ChatDetailComponent implements AfterViewChecked, OnInit {
  @ViewChild('scroller') private feed: ElementRef;

  threads: Observable<Thread[]>;
  thread: Thread;
  threadId: string;
  showThread: boolean;
  isMobile: boolean;
  isCreator: boolean;

  constructor( public el: ElementRef,
               private auth: AuthService,
               private location: Location,
               private threadService: ChatThreadService,
               private utils: UtilService,
               private route: ActivatedRoute,
               private router: Router,
               private dialog: MatDialog) {
                 this.threadService.showThread.subscribe(thread => this.showThread = thread);
                 this.isMobile = this.utils.checkIfMobile();
                 setTimeout(() => this.scrollToBottom(), 1000);
               }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.getThread();
  }

  scrollToBottom(): void {
    const scrollPane: any = document.querySelector('.chat-feed');
    if (scrollPane) {
      scrollPane.scrollTop = scrollPane.scrollHeight;
    }
  }

  getThread() {
    this.threads = this.threadService.getThreads();
    this.threads.subscribe(thread => {
      thread.map(data => {
        this.threadId = data.id;
        this.thread = data;
        this.isCreator = this.checkCreator(this.thread);
      });
    });
  }

  checkCreator(thread) {
    let isCreator;
    console.log(thread);
    if (thread.creator.creatorUID === `${this.auth.currentUserId}`) {
      isCreator = true;
    } else {
      isCreator = false;
    }

    return isCreator;
  }


  deleteChat() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        thread: this.thread
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const threadID = this.route.snapshot.paramMap.get('id');
        this.threadService.deleteThread(threadID);
        if (!this.isMobile) {
          return this.router.navigate(['chat']);
        } else {
          return this.threadService.showThread.next(true);
        }
      } else if (result === false) {
        return null;
      }
    });

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
