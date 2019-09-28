import { Component, Inject, ViewEncapsulation, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { BookingService } from '../../../booking/booking.service';
import { Appointment } from '../../../booking/appointment.model';
import { Specialist } from './../../../specialists/specialist.model';
import { User } from './../../../user/user.model';
import { SpecialistService } from './../../../specialists/specialist.service';
import { UserService } from './../../../user/user.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-detail-dialog',
  templateUrl: './appointment-detail-dialog.component.html',
  styleUrls: ['./appointment-detail-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentDetailDialogComponent implements OnDestroy {
  event: Appointment;

  // Involved user objects
  specialist: Specialist;
  specialist$: Subscription;
  client: User;
  client$: Subscription;

  // Substrings to display date and time
  start = {
    startDay: '',
    startMonth: '',
    startYear: '',
    startHours: '',
    startMinutes: '',
  };

  end = {
    endDay: '',
    endMonth: '',
    endYear: '',
    endHours: '',
    endMinutes: ''
  };

  // Month list
  monthList = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  // online call methods
  onlineAppointment = false;
  faceToFace = false;
  whatsApp = false;
  skype = false;
  onlinePhone = false;

  constructor( public auth: AuthService,
               private bookingService: BookingService,
               private userService: UserService,
               public matDialog: MatDialog,
               private cdr: ChangeDetectorRef,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private specialistService: SpecialistService
    ) {
      if (data.event.clientID) {
        this.event = data.event;
      } else {
        this.event = data.event.event;
      }

      this.doEventCheck(this.event);
      this.getTimeAndDate();
      this.getEndTimeAndDate();
      this.getSpecialist(this.event.specialistID);
      this.getClient(this.event.clientID);
    }

  ngOnDestroy() {
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
    this.client$.unsubscribe();
  }

  // Getters
  getEvent(data) {
    setTimeout(() => {
      if (this.event) {
        return null;
      } else {
        return this.event = data.event;
      }
    }, 500);
  }
  get editShow(): boolean {
    return this.bookingService.editShow;
  }

  doEventCheck(e) {
    if (e.meetMethod === 'faceToFace') {
      this.faceToFace = true;
      this.onlineAppointment = false;
    } else {
      this.onlineAppointment = true;
      this.faceToFace = false;
    }
    if (!this.faceToFace) {
      if (e.wappRest === '') {
        this.whatsApp = false;
      } else {
        this.whatsApp = true;
      }
      if (e.skypeName === null) {
        this.skype = false;
      } else {
        this.skype = true;
      }
      if (e.onlineAppointmentPhone.phoneRest === '') {
        this.onlinePhone = false;
      } else {
        this.onlinePhone = true;
      }
    }
  }

  getTimeAndDate() {
    const date  = new Date(this.event.start);
    const startDay = date.getDate().toString();
    const startMonth = this.monthList[date.getMonth()];
    const startYear = date.getFullYear().toString();
    const startHours = date.getHours().toString();
    const startMinutes = this.convertMinutes(date);

    this.start = {
      startDay, startMonth, startYear, startHours, startMinutes
    };
  }

  getEndTimeAndDate() {
    const date  = new Date(this.event.end);
    const endDay = date.getDate().toString();
    const endMonth = this.monthList[date.getMonth()];
    const endYear = date.getFullYear().toString();
    const endHours = date.getHours().toString();
    const endMinutes = this.convertMinutes(date);

    this.end = {
      endDay, endMonth, endYear, endHours, endMinutes
    };
  }

  convertMinutes(date) {
    const minutes = ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return minutes;
  }

  getSpecialist(sID) {
    this.specialist$ = this.specialistService.getSpecialistData(sID).subscribe(obj => this.specialist = obj);
  }

  getClient(uid) {
    this.client$ = this.userService.getUserDataByID(uid).subscribe(obj => this.client = obj);
  }

  // Edit event
  toggleEdit() {
    this.bookingService.toggleEdit();
  }

  // Delete event
  deleteEvent(event) {
    const id = event.eventID;
    this.bookingService.deleteEvent(id);
  }
}
