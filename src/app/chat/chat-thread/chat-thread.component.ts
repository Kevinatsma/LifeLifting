import { Component, Input, OnDestroy } from '@angular/core';
import { Thread } from './../thread.model';
import { ChatThreadService } from './../chat-thread.service';
import { User } from './../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../../user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent implements OnDestroy {
  @Input() thread: Thread;
  user: User;
  user$: Subscription;
  isCreator: boolean;
  param: string;
  id: any;
  hasUnreads = false;

  constructor( private threadService: ChatThreadService,
               public auth: AuthService,
               private userService: UserService,
               private route: ActivatedRoute) {
                setTimeout(() => {
                  this.checkUnreads();
                }, 300);
               }

  ngOnDestroy() {
    if (this.user$ !== undefined) {
      this.user$.unsubscribe();
    }
  }

  checkUnreads() {
    if (this.thread.lastSenderId === `${this.auth.currentUserId}`) {
      this.hasUnreads = false;
    } else  if ( this.thread.unreadMessages === 0 ) {
      this.hasUnreads = false;
    } else {
      this.hasUnreads = true;
    }
  }

  checkCreator() {
    const id = this.auth.currentUserId;
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      if (this.thread.creator.creatorUID === this.user.uid) {
        return this.isCreator = true;
      } else {
        return this.isCreator = false;
      }
    });
  }


  delete(threadId) {
    this.threadService.deleteThread(threadId);
  }
}
