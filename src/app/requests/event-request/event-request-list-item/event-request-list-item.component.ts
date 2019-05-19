import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Appointment } from './../../../booking/appointment.model';
import { Observable } from 'rxjs';
import { User } from './../../../user/user.model';
import { UserService } from './../../../user/user.service';
import { BookingService } from './../../../booking/booking.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Specialist } from './../../../specialists/specialist.model';
import { SpecialistService } from './../../../specialists/specialist.service';

@Component({
  selector: 'app-event-request-list-item',
  templateUrl: './event-request-list-item.component.html',
  styleUrls: ['./event-request-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EventRequestListItemComponent implements OnInit {
  @Input() event: Appointment;
  user: User;
  specialist: Specialist;
  eventAccepted = false;
  deleting = false;

  constructor( private userService: UserService,
               private bookingService: BookingService,
               private specialistService: SpecialistService,
               public router: Router,
               public dialog: MatDialog) {
                setTimeout(() => {
                  this.userService.getUserDataByID(this.event.clientID).subscribe(user => {
                    this.user = user;
                  });
                  this.specialistService.getSpecialistData(this.event.specialistID).subscribe(specialist => {
                    this.specialist = specialist;
                  });
                }, 500);
               }

  ngOnInit() {
  }

  acceptEvent(event, accepted = true) {
    const data = {
      accepted: this.eventAccepted || accepted
    };
    this.bookingService.updateEvent(event.eventID, data);

    // Update user
    const userData = {
      status: {
        appointment: true,
        appointmentAccepted: true,
        appointmentCompleted: false,
        appointmentRejected: false,
        accepted: this.user.status.accepted || false,
        signUpCompleted: this.user.status.signUpCompleted || true,
        subscriptionValid: this.user.status.subscriptionValid || true
      }
    };
    this.userService.updateUser(this.user.uid, userData);

    const newStat = this.specialist.stats.amountOfEventRequests - 1;
    const specialistData = {
      stats: {
        amountOfEventRequests: newStat
      }
    };
    const sID = this.specialist.specialistID;
    this.specialistService.updateSpecialist(sID, specialistData);
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
        accepted: this.user.status.accepted,
        signUpCompleted: this.user.status.signUpCompleted,
        subscriptionValid: this.user.status.subscriptionValid || true,
      }
    };
    this.bookingService.updateEvent(event.eventID, data);
    this.userService.updateUser(this.user.uid, userData);
    this.deleting = false;

    const newStat = this.specialist.stats.amountOfEventRequests - 1;
    const specialistData = {
      stats: {
        amountOfEventRequests: newStat
      }
    };
    const sID = this.specialist.specialistID;
    this.specialistService.updateSpecialist(sID, specialistData);
  }

  toUser(uid) {
    const url = `dashboard/users/${uid}`;
    this.router.navigate([url]);
    this.dialog.closeAll();
  }

}
