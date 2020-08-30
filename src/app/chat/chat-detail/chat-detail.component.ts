import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';

import { Location } from '@angular/common';
import { ChatThreadService } from './../chat-thread.service';
import { Observable, Subscription } from 'rxjs';
import { Thread } from './../thread.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UtilService } from '../../shared/services/util.service';
import { AuthService } from './../../core/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})

export class ChatDetailComponent implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('scroller', {static: false}) private feed: ElementRef;
  navigationSubscription$: Subscription;
  threads: Observable<Thread[]>;
  thread: Thread;
  threadID: string;
  thread$: Subscription;
  threadId: string;
  showThread: boolean;
  showThread$: Subscription;
  isMobile: boolean;
  isCreator: boolean;
  routeSub$: Subscription;

  constructor( public el: ElementRef,
               public auth: AuthService,
               private threadService: ChatThreadService,
               private utils: UtilService,
               private route: ActivatedRoute,
               private router: Router,
               private dialog: MatDialog) {
                this.showThread$ = this.threadService.showThread.subscribe(thread => {
                  this.showThread = thread;
                });

                this.isMobile = this.utils.checkIfMobile();
                setTimeout(() => {
                  this.scrollToBottom();
                  this.routeSub$ = this.route.params.subscribe(params => {
                    this.threadID = params['id'];
                    this.setActiveThread(this.threadID);
                  });
                }, 750);
               }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.getThread();
    this.navigationSubscription$ = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event, re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getThread();
        this.setActiveThread(this.threadID);
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription$.unsubscribe();
    this.showThread$.unsubscribe();
    this.thread$.unsubscribe();
    this.routeSub$.unsubscribe();
  }

  scrollToBottom(): void {
    const scrollPane: any = document.querySelector('.chat-feed');
    if (scrollPane) {
      scrollPane.scrollTop = scrollPane.scrollHeight;
    }
  }

  getThread() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.thread$ = this.threadService.getThread(id).subscribe(thread => {
        this.threadId = thread.id;
        this.thread = thread;
        this.isCreator = this.checkCreator(thread);
        this.threadService.activeThreadID.next(id);
      });
    }
  }

  setActiveThread(id) {
    const threadDiv = document.querySelectorAll('.thread-item');
    const threadDivActive = document.getElementById(`${id}`);
    threadDiv.forEach(el => {
      el.classList.remove('active');
    });
    threadDivActive.classList.add('active');
  }

  checkCreator(thread) {
    let isCreator;
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

  // Links
  linkToProfile(id) {
    this.router.navigate([`../../dashboard/users/${id}`]);
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }
}
