import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ChatThreadService } from '../../../../chat/chat-thread.service';

@Component({
  selector: 'app-my-client-list-item',
  templateUrl: './my-client-list-item.component.html',
  styleUrls: ['./my-client-list-item.component.scss']
})
export class MyClientListItemComponent implements OnInit {
  @Input() user: User;
  detailOpen = false;

  constructor( public router: Router,
               public dialog: MatDialog,
               public threadService: ChatThreadService) { }

  ngOnInit() {
  }

  linkToChild(user) {
    const url = `dashboard/my-clients/${user.uid}`;
    this.router.navigate([url]);
  }

  chat() {
    const profileId = this.user.uid;
    return this.threadService.createThread(profileId);
  }
}
