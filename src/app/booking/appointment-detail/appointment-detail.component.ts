import { Component, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BookingService } from '../../booking/booking.service';
import { Appointment } from '../../booking/appointment.model';
import { Specialist } from './../../specialists/specialist.model';
import { User } from './../../user/user.model';
import { SpecialistService } from './../../specialists/specialist.service';
import { UserService } from './../../user/user.service';
import { AuthService } from './../../core/auth/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentDetailComponent implements OnDestroy {
  @Input() event: Appointment;
  @Input() editAllowed: boolean;
  editShow = false;
  // Involved user objects
  specialist$: Subscription;
  client$: Subscription;
  specialist: Specialist;
  client: User;

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
               private specialistService: SpecialistService
    ) {
      setTimeout(() => {
        this.doEventCheck(this.event);
        this.getTimeAndDate();
        this.getEndTimeAndDate();
        this.getSpecialist(this.event.specialistID);
        this.getClient(this.event.clientID);
      }, 200);
  }

  ngOnDestroy() {
    if (this.specialist$ !== undefined) {
      this.specialist$.unsubscribe();
    }
    if (this.client$ !== undefined) {
      this.client$.unsubscribe();
    }
  }

  // Getters

  doEventCheck(e) {
    if (e.meetMethod === 'faceToFace') {
      this.faceToFace = true;
      this.onlineAppointment = false;
    } else {
      this.onlineAppointment = true;
      this.faceToFace = false;
    }
    if (!this.faceToFace) {
      if (e.whatsappNumber.wappRest === '') {
        this.whatsApp = false;
      } else {
        this.whatsApp = true;
      }
      if (e.skypeName === null) {
        this.skype = false;
      } else {
        this.skype = true;
      }
      if (e.onlineAppointmentPhone.phoneRest !== '') {
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
    this.specialist$ = this.specialistService.getSpecialistData(sID).subscribe(obj => {
      this.specialist = obj;
    });
  }

  getClient(uid) {
    this.client$ = this.userService.getUserDataByID(uid).subscribe(obj => {
      this.client = obj;
    });
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
