import { Component, OnInit, Inject, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingService } from './../../../booking/booking.service';
import { Appointment } from './../../../booking/appointment.model';
import { User } from './../../../user/user.model';
import { AuthService } from './../../../core/auth/auth.service';
import { Specialist } from './../../../specialists/specialist.model';
import { UserService } from './../../../user/user.service';
import { SpecialistService } from './../../../specialists/specialist.service';
import { Subject, Subscription } from 'rxjs';
import { UtilService } from '../../services/util.service';
import { take } from 'rxjs/operators';
import countryCodes from './../../../shared/data/JSON/countryCodes.json';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAppointmentDialogComponent implements OnInit, OnDestroy {
  user: User;
  specialist: Specialist;
  specialistID: string;
  clients: User[];
  clients$: Subscription;
  specialists: Specialist[];
  specialist$: Subscription;
  specialists$: Subscription;
  areaCodes = countryCodes.countryCodes;

  hide = true;
  appointmentForm: FormGroup;

  // Meet methods
  faceToFace: Subject<boolean> = new Subject();
  onlineAppointment: Subject<boolean> = new Subject();

  // Call methods
  whatsApp: Subject<boolean> = new Subject();
  skype: Subject<boolean> = new Subject();
  onlinePhone: Subject<boolean> = new Subject();

  // If date check is positive, these values will be filled
  hasStartDate: boolean;
  startDate: Date;
  hasEndDate: boolean;
  endDate: Date;
  start: {};
  end: {};
  clientEnd: {};
  monthList = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  // Set values
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
               private utils: UtilService,
               private specialistService: SpecialistService,
               private cdr: ChangeDetectorRef,
               private dialog: MatDialog
    ) {
      this.user = data.user;
      this.specialist =  data.specialist;
      this.setStandardColors(data.user);
      this.setAppointmentAccepted(data.user);
      this.getClients();
      this.getSpecialists();
      this.checkForDate(data.date);
      if ( this.user.roles.client && !this.user.roles.specialist && !this.user.roles.admin) {
        this.hasEndDate = true;
      }
    }

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      eventTitle: ['', Validators.required],
      clientID: [''] || null,
      specialistID: [''] || null,
      selectedColorPrimary: [''],
      selectedColorSecondary: [''],
      startTime: [''],
      startHour: [''],
      startMinutes: [''],
      appointmentContext: ['', Validators.required],
      location: [''] || null,
    });
  }

  ngOnDestroy() {
    if (this.clients$ !== undefined) { this.clients$.unsubscribe(); }
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
    if (this.specialists$ !== undefined) { this.specialists$.unsubscribe(); }
  }

  // Toggles
  toggleContext() {
    const formValue = this.appointmentForm.get('appointmentContext').value;
    this._resetContactForm();
    if (formValue === 'faceToFace') {
      this.onlineAppointment.next(false);
      this.faceToFace.next(true);
      if (this.appointmentForm.controls['contactMethod']) {
        this.appointmentForm.removeControl('contactMethod');
      }
    } else {
      this.faceToFace.next(false);
      this.onlineAppointment.next(true);
      this.appointmentForm.addControl('contactMethod', new FormControl('', Validators.required));
    }
    this.cdr.detectChanges();
  }

  toggleContactMethod() {
    const formValue = this.appointmentForm.get('contactMethod').value;
    if (formValue === 'whatsApp') {
      this.whatsApp.next(true);
      this.skype.next(false);
      this.onlinePhone.next(false);

      this._resetContactForm();
      this.appointmentForm.addControl('wappAreaCode', new FormControl('', Validators.required));
      this.appointmentForm.addControl('wappRest', new FormControl('', Validators.required));
    } else if (formValue  === 'skype') {
      this.whatsApp.next(false);
      this.skype.next(true);
      this.onlinePhone.next(false);

      this._resetContactForm();
      this.appointmentForm.addControl('skypeName', new FormControl('', Validators.required));
    } else {
      this.whatsApp.next(false);
      this.skype.next(false);
      this.onlinePhone.next(true);

      this._resetContactForm();
      this.appointmentForm.addControl('phoneAreaCode', new FormControl(`${this.phoneAreaCode.value}`, Validators.required));
      this.appointmentForm.addControl('phoneRest', new FormControl('', Validators.required));
    }

    this.cdr.detectChanges();
  }


  _resetContactForm() {
    if (this.appointmentForm.controls['phoneAreaCode']) {
      this.appointmentForm.removeControl('phoneAreaCode');
      this.appointmentForm.removeControl('phoneRest');
    }
    if (this.appointmentForm.controls['wappAreaCode']) {
      this.appointmentForm.removeControl('wappAreaCode');
      this.appointmentForm.removeControl('wappRest');
    }
    if (this.appointmentForm.controls['skypeName']) {
      this.appointmentForm.removeControl('skypeName');
    }
  }

  // Getters
  get appointmentText() {
    return this.appointmentForm.get('appointmentText');
  }

  getClients() {
    this.clients$ = this.userService.getUsers().subscribe(users => this.clients = users);
  }

  getSpecialist() {
    let sID;
    if (this.user.roles.admin) {
      sID = this.appointmentForm.get('specialistID').value;
    } else if (this.user.roles.specialist && !this.user.roles.admin) {
      sID = `specialist${this.user.sID}`;
    } else if (this.user.roles.client && !this.user.roles.specialist && !this.user.roles.admin) {
      sID = this.user.specialist;
    }
    this.specialistID = sID;
    this.specialist$ = this.specialistService.getSpecialistData(sID).pipe(take(1)).subscribe(specialist => {
      this.specialist = specialist;
      this.addEvent(this.specialist);
    });
  }

  getSpecialists() {
    this.specialists$ = this.specialistService.getSpecialists().subscribe(specialists => this.specialists = specialists);
  }

  // Add Appointment
  addButtonDisabled(): boolean {
    return !this.appointmentForm.valid;
  }

  addEvent(specialist) {
    const startNoTime = new Date(this.appointmentForm.get('startTime').value).toString();
    const endNoTime = new Date(this.appointmentForm.get('startTime').value).toString();
    let start;
    let end;

    if (this.user.roles.specialist || this.user.roles.admin) {
      start = startNoTime
        .replace('00:00:00',
        `${this.appointmentForm.get('startHour').value}` + ':' + `${this.appointmentForm.get('startMinutes').value}` + ':00');

      end = endNoTime
        .replace('00:00:00',
        `${this.appointmentForm.get('startHour').value + 1}` + ':' + `${this.appointmentForm.get('startMinutes').value}` + ':00');
    } else {
      start = this.data.date.toString();
      end = this.utils.dateAdd(this.data.date, 'minute', 60).toString();
    }

    let title;

    if (this.user.roles.admin || this.user.roles.specialist) {
      title = this.appointmentForm.get('eventTitle').value;
    } else {
      title = `Consultation with your specialist`;
    }

    const specialistID = this.specialistID;
    const data: Appointment = {
      accepted: this.appointmentAccepted,
      rejected: false,
      created: new Date(),
      title: title,
      start: start,
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
      specialistID: specialistID,
      clientID: this.appointmentForm.get('clientID').value || this.user.uid,
      members: [this.user.uid, this.specialist.uid],
      meetMethod: this.appointmentForm.get('appointmentContext').value,
      contactMethod: this.appointmentForm['contactMethod'] ? this.appointmentForm.get('contactMethod').value : null,
      faceToFacePhone: this.user.basicData.phoneNumber,
      location: this.appointmentForm.get('location').value || null,
      whatsappNumber: this.appointmentForm['wappAreaCode'] ?
        this.appointmentForm.get('wappAreaCode').value + this.appointmentForm.get('wappRest').value :
        null,
      skypeName: this.appointmentForm['skypeName'] ? this.appointmentForm.get('skypeName').value : null,
      onlineAppointmentPhone: {
        phoneAreaCode: this.appointmentForm['phoneAreaCode'] ? this.appointmentForm.get('phoneAreaCode').value : null,
        phoneRest: this.appointmentForm['phoneAreaCode'] ? this.appointmentForm.get('phoneRest').value : null
      }
    };

    // Update request amount on specialist
    this.updateSpecialist(specialist);

    // add event to db
    this.bookingService.addEvent(data, this.user);
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

  // Checkers

  checkForDate(date) {
    if (date) {
      this.hasStartDate = true;
      this.hasEndDate = true;
      this.getTimeAndDate(date);

      // Set end date for clients ( + half an hour)
      if (this.user.roles.admin || this.user.roles.specialist ) {
        this.hasEndDate = false;
      }

    }
  }

  updateSpecialist(specialist) {
    let amount;
    if (specialist.stats) {
      amount = specialist.stats.amountOfEventRequests + 1;
    } else {
      amount = 1;
    }

    const specialistData = {
      stats: {
        amountOfEventRequests: amount
      }
    };
    this.specialistService.updateSpecialist(specialist.specialistID, specialistData);
  }

  // Format date

  getTimeAndDate(dateObj) {
    const date  = new Date(dateObj);
    const startDay = date.getDate().toString();
    const startMonth = this.monthList[date.getMonth()];
    const startYear = date.getFullYear().toString();
    const startHours = date.getHours().toString();
    const startMinutes = this.convertMinutes(date);


    this.start = {
      startDay, startMonth, startYear, startHours, startMinutes
    };
    this.startDate = date;
    this.getEndTimeAndDate(dateObj);
  }

  getEndTimeAndDate(dateObj) {
    const date = this.utils.dateAdd(dateObj, 'minute', 60);
    const endDay = date.getDate().toString();
    const endMonth = this.monthList[date.getMonth()];
    const endYear = date.getFullYear().toString();
    const endHours = date.getHours().toString();
    const endMinutes = this.convertMinutes(date);

    this.end = {
      endDay, endMonth, endYear, endHours, endMinutes
    };
    this.endDate = date;
  }

  convertMinutes(date) {
    const minutes = ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return minutes;
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop adding this event?')) {
      this.dialog.closeAll();
    }
  }
}
