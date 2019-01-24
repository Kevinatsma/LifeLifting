import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../user/user.model';
import { ConfirmDialogComponent } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { UserService } from '../../../../user/user.service';
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
    const url = `dashboard/users/${user.uid}`;
    this.router.navigate([url]);
  }

  chat() {
    const profileId = this.user.uid;
    return this.threadService.createThread(profileId);
  }
}
