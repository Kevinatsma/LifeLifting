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
  startDay: string;
  startMonth: string;
  startYear: string;
  startHours: string;
  startMinutes: string;

  endDay: string;
  endMonth: string;
  endYear: string;
  endHours: string;
  endMinutes: string;

  // Month list
  monthList = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  constructor( private bookingService: BookingService,
               private userService: UserService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private specialistService: SpecialistService
    ) {
      this.event = data.event.event;
      this.getTimeAndDate();
      this.getEndTimeAndDate();
      this.getSpecialist(this.event.specialistID);
      this.getClient(this.event.clientID);
    }

  // Getters

  getTimeAndDate() {
    const date  = new Date(this.event.start);
    this.startDay = date.getDate().toString();
    this.startMonth = this.monthList[date.getMonth()];
    this.startYear = date.getFullYear().toString();
    this.startHours = date.getHours().toString();
    this.startMinutes = this.convertMinutes(date);
  }

  getEndTimeAndDate() {
    const date  = new Date(this.event.end);
    this.endDay = date.getDate().toString();
    this.endMonth = this.monthList[date.getMonth()];
    this.endYear = date.getFullYear().toString();
    this.endHours = date.getHours().toString();
    this.endMinutes = this.convertMinutes(date);
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

  // Delete event
  deleteEvent(event) {
    const id = event.eventID;
    this.bookingService.deleteEvent(id);
  }
}
