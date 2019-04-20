import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Appointment } from './../../../booking/appointment.model';
import { Observable } from 'rxjs';
import { User } from './../../../user/user.model';
import { UserService } from './../../../user/user.service';
import { BookingService } from './../../../booking/booking.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-event-request-list-item',
  templateUrl: './event-request-list-item.component.html',
  styleUrls: ['./event-request-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EventRequestListItemComponent implements OnInit {
  @Input() event: Appointment;
  user: User;
  eventAccepted = false;
  deleting = false;

  constructor( private userService: UserService,
               private bookingService: BookingService,
               public router: Router,
               public dialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.userService.getUserDataByID(this.event.clientID).subscribe(user => this.user = user);
    }, 500);
  }

  acceptEvent(event) {
    const data = {
      accepted: this.eventAccepted
    };
    this.bookingService.updateEvent(event.eventID, data);

    // Update user
    const userData = {
      status: {
        appointment: true,
        appointmentAccepted: true,
        appointmentCompleted: false,
        appointmentRejected: false,
        accepted: false,
        signUpCompleted: this.user.status.signUpCompleted,
      }
    };
    this.userService.updateUser(this.user.uid, userData);
  }

  deleteConfirm() {
    this.deleting  = true;
  }

  deleteCancel() {
    this.deleting = false;
  }

  deleteRequest(event) {
    const data = {
      rejected: true
    };
    const userData = {
      status: {
        appointment: true,
        appointmentAccepted: false,
        appointmentCompleted: false,
        appointmentRejected: true,
        accepted: false,
        signUpCompleted: this.user.status.signUpCompleted,
      }
    };
    this.bookingService.updateEvent(event.eventID, data);
    this.userService.updateUser(this.user.uid, userData);
    this.deleting = false;
  }

  toUser(uid) {
    const url = `dashboard/users/${uid}`;
    this.router.navigate([url]);
    this.dialog.closeAll();
  }

}
