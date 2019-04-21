import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { User } from './../../user/user.model';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrls: ['./event-request.component.scss']
})
export class EventRequestComponent implements OnInit {
  user: User;

  constructor( public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                this.user = data.user;
               }

  ngOnInit() {
  }

}
