import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AddUserDialogComponent } from './../../shared/dialogs/add-user-dialog/add-user-dialog.component';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  allUsers = true;
  acceptedUsers = false;
  unacceptedUsers = false;

  constructor( public location: Location,
               public dialog: MatDialog,
               private afs: AngularFirestore,
               private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent, {});
  }

  // Filters collection based on mat menu input.
  // Sets status for active css class
  toggleQuery(event) {
    let colRef;
    if (event === 'all') {
      this.users = this.userService.getUsers();
      this.allUsers = true;
      this.acceptedUsers = false;
      this.unacceptedUsers = false;
    } else if (event === 'accepted') {
      colRef = this.afs.collection('users', ref => ref.where('status.accepted', '==', true));
      this.users  = this.userService.queryUsers(colRef);
      this.acceptedUsers = true;
      this.unacceptedUsers = false;
      this.allUsers = false;
    } else if (event === 'unaccepted') {
      colRef = this.afs.collection('users', ref => ref.where('status.accepted', '==', false));
      this.users = this.userService.queryUsers(colRef);
      this.unacceptedUsers = true;
      this.acceptedUsers = false;
      this.allUsers = false;
    }
  }

  goBack() {
    this.location.back();
  }
}
