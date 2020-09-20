import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { User } from './../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';
import { Router } from '@angular/router';
import { ClientService } from './../../clients/client.service';
import { DashboardService } from '../dashboard.service';
import { ChatThreadService } from './../../chat/chat-thread.service';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-top-nav',
  templateUrl: './dashboard-top-nav.component.html',
  styleUrls: ['./dashboard-top-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardTopNavComponent implements OnInit, OnDestroy {
  @Input() user: User;
  destroy$: Subject<boolean> = new Subject<boolean>();
  replacementURL = './../../../../assets/img/icons/user-no-photo.svg';
  hasUnreads = false;

  constructor( private auth: AuthService,
               public router: Router,
               private clientService: ClientService,
               private dashboardService: DashboardService,
               private threadService: ChatThreadService) { }

  ngOnInit() {
    this.checkUnreads();
  }

  checkUnreads() {
    this.threadService.getThreads().pipe(
      takeUntil(this.destroy$)
    ).subscribe(this.setUnreadFlag);
  }

  setUnreadFlag = (threads) => {
    let hasUnreads = false;
    _.forEach(threads, thread => {
      if (!hasUnreads) {
        if (thread.lastSenderId === `${this.auth.currentUserId}`) {
          hasUnreads = false;
        } else  if (thread.unreadMessages === 0 ) {
          hasUnreads = false;
        } else {
          hasUnreads = true;
        }
      }
    });
    this.hasUnreads = hasUnreads;
  }

  editUser(user) {
    const url = `dashboard/clients/${user.uid}`;
    this.router.navigate([url]);
    return this.clientService.editShow = true;
  }

  toggleSideNav() {
    this.dashboardService.toggleSideNav();
  }

  signOut() {
    this.auth.signOut();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
