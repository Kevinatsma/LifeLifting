import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { BookingService } from './../../../booking/booking.service';
import { Appointment } from './../../../booking/appointment.model';
import { User } from './../../../user/user.model';
import { AuthService } from './../../../core/auth/auth.service';
import { Specialist } from './../../../specialists/specialist.model';
import { UserService } from './../../../user/user.service';
import { SpecialistService } from './../../../specialists/specialist.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.scss']
})
export class AddAppointmentDialogComponent implements OnInit {
  user: User;
  specialist: Specialist;

  clients: User[];
  specialists: Specialist[];

  hide = true;
  appointmentForm: FormGroup;

  faceToFace: Subject<boolean> = new Subject();
  onlineAppointment: Subject<boolean> = new Subject();

  whatsApp: Subject<boolean> = new Subject();
  skype: Subject<boolean> = new Subject();
  onlinePhone: Subject<boolean> = new Subject();

  // set values
  standardColorPrimary = '#2ecc71';
  standardColorSecondary = '#5ec78a';
  phoneAreaCode = new FormControl({value: '+51', disabled: true});
  appointmentAccepted = false;

  constructor( public auth: AuthService,
               private fb: FormBuilder,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private bookingService: BookingService,
               private userService: UserService,
               private specialistService: SpecialistService,
               private cdr: ChangeDetectorRef
    ) {
      this.user =  data.user;
      this.specialist =  data.specialist;
      this.setStandardColors(data.user);
      this.setAppointmentAccepted(data.user);
      this.getClients();
      this.getSpecialists();
    }

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      eventTitle: ['', Validators.required],
      clientID: [''] || null,
      specialistID: [''] || null,
      selectedColorPrimary: [''],
      selectedColorSecondary: [''],
      startTime: ['', Validators.required],
      startHour: ['', Validators.required],
      startMinutes: ['', Validators.required],
      faceToFacePhone: this.fb.group({
        'phoneAreaCode': [''] || null,
        'phoneRest': [''] || null,
      }),
      onlinePhone: this.fb.group({
        phoneAreaCode: [`${this.phoneAreaCode.value}`],
        'phoneRest': [''] || null,
      }),
      wappNumber: this.fb.group({
        'wappAreaCode': [''] || null,
        'wappRest': [''] || null,
      }),
      appointmentContext: [''],
      contactMethod: [''],
      location: [''] || null,
      skypeName: [''] || null
    });
  }

  // Toggles

  toggleContext() {
    const formValue = this.appointmentForm.get('appointmentContext').value;

    if (formValue === 'faceToFace') {
      this.onlineAppointment.next(false);
      this.faceToFace.next(true);
    } else {
      this.faceToFace.next(false);
      this.onlineAppointment.next(true);
    }
    this.cdr.detectChanges();
  }

  toggleContactMethod() {
    const formValue = this.appointmentForm.get('contactMethod').value;
    if (formValue === 'whatsApp') {
      this.whatsApp.next(true);
      this.skype.next(false);
      this.onlinePhone.next(false);
    } else if (formValue  === 'skype') {
      this.whatsApp.next(false);
      this.skype.next(true);
      this.onlinePhone.next(false);
    } else {
      this.whatsApp.next(false);
      this.skype.next(false);
      this.onlinePhone.next(true);
    }

    this.cdr.detectChanges();
  }

  // Getters

  get appointmentText() {
    return this.appointmentForm.get('appointmentText');
  }

  getClients() {
    this.userService.getUsers().subscribe(users => this.clients = users);
  }

  getSpecialists() {
    this.specialistService.getSpecialists().subscribe(specialists => this.specialists = specialists);
  }

  // Add Appointment
  addEvent(): void {
    const startNoTime = new Date(this.appointmentForm.get('startTime').value).toString();
    const endNoTime = new Date(this.appointmentForm.get('startTime').value).toString();
    const start = startNoTime
      .replace('00:00:00',
      `${this.appointmentForm.get('startHour').value}` + ':' + `${this.appointmentForm.get('startMinutes').value}` + ':00');
    const end = endNoTime
      .replace('00:00:00',
      `${this.appointmentForm.get('startHour').value + 1}` + ':' + `${this.appointmentForm.get('startMinutes').value}` + ':00');
    const data: Appointment = {
      accepted: this.appointmentAccepted,
      created: new Date(),
      title: this.appointmentForm.get('eventTitle').value,
      start: start,
      // start: new Date(),
      end: end,
      color: {
        primary: this.appointmentForm.get('selectedColorPrimary').value || this.standardColorPrimary,
        secondary: this.appointmentForm.get('selectedColorSecondary').value ||  this.standardColorSecondary,
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      specialistID: this.appointmentForm.get('specialistID').value || this.user.specialist || `specialist${this.user.sID}`,
      clientID: this.appointmentForm.get('clientID').value || this.user.uid,
      members: [this.user.uid, this.specialist.uid],
      meetMethod: this.appointmentForm.get('appointmentContext').value,
      contactMethod: this.appointmentForm.get('contactMethod').value,
      faceToFacePhone: this.appointmentForm.controls.faceToFacePhone.value || null,
      location: this.appointmentForm.get('location').value || null,
      whatsappNumber: this.appointmentForm.get('wappNumber').value || null,
      skypeName: this.appointmentForm.get('skypeName').value || null,
      onlineAppointmentPhone: this.appointmentForm.controls.onlinePhone.value || null
    };
    this.bookingService.addEvent(data);
  }

  // Setters

  setStandardColors(user) {
    if (user.roles.admin) {
      this.standardColorPrimary = '#e74c3c';
      this.standardColorSecondary = '#f58f84';
    } else if (!user.roles.admin && user.roles.specialist) {
      this.standardColorPrimary = '#3498db';
      this.standardColorSecondary = '#6aacd8';
    }
  }

  setAppointmentAccepted(user: User) {
    if (user.roles.admin) {
      this.appointmentAccepted = true;
    } else if (user.roles.specialist) {
      this.appointmentAccepted = true;
    }
  }
}
