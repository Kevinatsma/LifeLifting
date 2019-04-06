import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { BookingService } from '../../../booking/booking.service';
import { Appointment } from '../../../booking/appointment.model';
import { Specialist } from './../../../specialists/specialist.model';
import { User } from './../../../user/user.model';
import { SpecialistService } from './../../../specialists/specialist.service';
import { UserService } from './../../../user/user.service';

@Component({
  selector: 'app-appointment-detail-dialog',
  templateUrl: './appointment-detail-dialog.component.html',
  styleUrls: ['./appointment-detail-dialog.component.scss']
})
export class AppointmentDetailDialogComponent {
  event: Appointment;

  // Involved user objects
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
  whatsApp = false;
  skype = false;
  onlinePhone = false;

  constructor( private bookingService: BookingService,
               private userService: UserService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private specialistService: SpecialistService
    ) {
      this.event = data.event.event;
      this.doEventCheck(this.event);
      console.log(this.event);
      this.getTimeAndDate();
      this.getEndTimeAndDate();
      this.getSpecialist(this.event.specialistID);
      this.getClient(this.event.clientID);
    }

  // Getters

  get editShow(): boolean {
    return this.bookingService.editShow;
  }

  doEventCheck(e) {
    if (e.whatsappNumber === null) {
      this.whatsApp = false;
    } else {
      this.whatsApp = true;
    }
    if (e.skypeName === null) {
      this.skype = false;
    } else {
      this.skype = true;
    }
    if (e.onlineAppointmentPhone.phoneAreaCode === '') {
      this.onlinePhone = false;
    } else {
      this.onlinePhone = true;
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
    this.specialistService.getSpecialistData(sID).subscribe(obj => this.specialist = obj);
  }

  getClient(uid) {
    this.userService.getUserDataByID(uid).subscribe(obj => this.client = obj);
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