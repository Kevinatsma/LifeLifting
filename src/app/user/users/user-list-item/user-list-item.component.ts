import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../user.model';
import { ConfirmDialogComponent } from './../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { UserService } from './../../user.service';
import { ChatThreadService } from './../../../chat/chat-thread.service';
import { AuthService } from './../../../core/auth/auth.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;
  detailOpen = false;
  tooltipPosition = 'left';

  constructor( public auth: AuthService,
               public router: Router,
               public dialog: MatDialog,
               private userService: UserService,
               public threadService: ChatThreadService) { }

  ngOnInit() {
  }

  deleteUserDialog(user) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        uid: user.uid,
        displayName: user.displayName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = user.uid;
        this.userService.deleteUser(id);
      } else if (result === false) {
        return null;
      }
    });
  }

  editUser(user) {
    const url = `dashboard/users/${user.uid}`;
    this.router.navigate([url]);
    return this.userService.editShow = true;
  }

  acceptUser(user) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        acceptedUser: user.displayName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = user.uid;
        const data = {
          status: {
            accepted: true,
            signUpCompleted: user.status.signUpCompleted,
            subscriptionValid: user.status.subscriptionValid || false,
            appointment: user.status.appointment,
            appointmentAccepted: user.status.appointmentAccepted,
            appointmentCompleted: user.status.appointmentCompleted,
          }
        };
        this.userService.updateUser(id, data);
      } else if (result === false) {
        return null;
      }
    });
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
