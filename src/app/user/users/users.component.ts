import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users: User[];
  searchUsers = [];
  allUsers = true;
  acceptedUsers = false;
  unacceptedUsers = false;
  filterSelection: string;
  searchActive = false;

  constructor( public location: Location,
               public dialog: MatDialog,
               private afs: AngularFirestore,
               public cdr: ChangeDetectorRef,
               private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent, {
      panelClass: 'add-user-dialog'
    });
  }

  // Filters collection based on mat menu input.
  // Sets status for active css class
  toggleQuery(event) {
    let colRef;
    if (event === 'all') {
      this.userService.getUsers().subscribe(users => this.users = users);
      this.allUsers = true;
      this.acceptedUsers = false;
      this.unacceptedUsers = false;
    } else if (event === 'accepted') {
      colRef = this.afs.collection('users', ref => ref.where('status.accepted', '==', true));
      this.userService.queryUsers(colRef).subscribe(users => this.users = users);
      this.acceptedUsers = true;
      this.unacceptedUsers = false;
      this.allUsers = false;
    } else if (event === 'unaccepted') {
      colRef = this.afs.collection('users', ref => ref.where('status.accepted', '==', false));
      this.userService.queryUsers(colRef).subscribe(users => this.users = users);
      this.unacceptedUsers = true;
      this.acceptedUsers = false;
      this.allUsers = false;
    }
  }

  onChangeSearch(e) {
    const searchInput = e.target.value.toLowerCase();

    // Show correct user list
    this.searchActive = e.target.value !== '';
    this.cdr.detectChanges();

    // Reset search array
    this.searchUsers = [];

    // Filter objects on display name and push matches to search array
    this.users.forEach(obj => {
      if (obj.displayName.toLowerCase().includes(`${searchInput}`)) {
        this.searchUsers.push(<User>obj);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
