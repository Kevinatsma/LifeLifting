import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../user.model';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { UserService } from './../../user.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;
  detailOpen = false;

  constructor( public router: Router,
               public dialog: MatDialog,
               private userService: UserService) { }

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
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        console.log('i"m being called');
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
  }


  linkToChild(user) {
    const url = `dashboard/users/${user.uid}`;
    this.router.navigate([url]);
  }

}
