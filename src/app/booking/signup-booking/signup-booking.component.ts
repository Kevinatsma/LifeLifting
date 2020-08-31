import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {isSameMonth, isSameDay } from 'date-fns';
import { Observable, Subscription, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarEventTitleFormatter, CalendarMonthViewDay } from 'angular-calendar';
import { BookingService } from '../booking.service';
import { User } from '../../user/user.model';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from '../../user/user.service';
import { Appointment } from '../appointment.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { SpecialistService } from '../../specialists/specialist.service';
import { Specialist } from '../../specialists/specialist.model';
import { ChatThreadService } from '../../chat/chat-thread.service';
import { AppointmentDetailDialogComponent } from '../../shared/dialogs/appointment-detail-dialog/appointment-detail-dialog.component';
import { CustomEventTitleFormatter } from '../custom-event-title-formatter.provider';
import { Router } from '@angular/router';
import { UtilService } from './../../shared/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import countryCodes from './../../shared/data/JSON/countryCodes.json';
import firebase from 'firebase';
import moment from 'moment';

@Component({
  selector: 'app-signup-booking',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./signup-booking.component.scss'],
  templateUrl: './signup-booking.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})

export class SignUpBookingComponent implements OnInit, OnDestroy {
  user: User;
  specialist: Specialist;
  user$: Subscription;
  specialist$: Subscription;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ event: Appointment }>>>;
  events: Appointment[];

  destroy$: Subject<boolean> = new Subject();
  appointmentForm: FormGroup;
  phoneAreaCode = new FormControl({value: '+51', disabled: true});
  areaCodes = countryCodes.countryCodes;

  modalData: {
    action: string;
    event: Appointment;
  };

  actions: CalendarEventAction[] = [];

  activeDayIsOpen = true;
  showStepTwoMobile = false;
  isMobile: boolean;
  startDate: any;

  // Substrings to display date and time
  start = {
    startDay: '',
    startMonth: '',
    startYear: '',
    startHours: '',
    startMinutes: '',
  };
  endDate: Date;
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
  excludeDays: number[] = [0, 6];

  // Meet methods
  faceToFace: Subject<boolean> = new Subject();
  onlineAppointment: Subject<boolean> = new Subject();

  // Call methods
  whatsApp: Subject<boolean> = new Subject();
  skype: Subject<boolean> = new Subject();
  onlinePhone: Subject<boolean> = new Subject();

  // TODO: HOOKUP MAT DIALOG INSTEAD OF BOOTSTRAP MODAL
  constructor( private userService: UserService,
               public auth: AuthService,
               private dialog: MatDialog,
               private bookingService: BookingService,
               private specialistService: SpecialistService,
               private utils: UtilService,
               private threadService: ChatThreadService,
               public location: Location,
               public router: Router,
               private fb: FormBuilder,
               private afs: AngularFirestore,
               private cdr: ChangeDetectorRef) {
                this.getUser();
                this.isMobile = this.utils.checkIfMobile();
               }

  ngOnInit() {
    this.replaceDates();
    this.appointmentForm = this.fb.group({
      meetMethod: ['', Validators.required],
    });
  }

    // Toggles
    toggleContext() {
      const formValue = this.appointmentForm.get('meetMethod').value;

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
        this.appointmentForm.addControl('phoneAreaCode', this.phoneAreaCode);
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

  replaceDates() {
    this.utils.replaceCalendarHeaderDates();
  }

  // Getters

  getUser() {
    const id = this.auth.currentUserId;
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      this.specialist$ = this.specialistService.getSpecialistData(user.specialist).subscribe(specialist => {
        this.specialist = specialist;
      });
      this.getEvents(this.user);
    });
  }

  getTimezoneOffsetString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset();
    const hoursOffset = String(
      Math.floor(Math.abs(timezoneOffset / 60))
    ).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';

    return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
  }

  // mapEvents = (events: Appointment[]): Appointment[] => {
  //   const addTwoDays = this.utils.dateAdd(new Date(), 'hour', 48);
  //   console.log('first income events', events);
  //   const time = moment.duration("00:09:15");
  //   let date = moment("2020-08-18 17:22:06");
  //   date.subtract(time);
  //   const blockedEvent: Appointment = {
  //     accepted: true,
  //     clientID: 'XeeS86g4KpgtXri8OIB9eO1KwfE3',
  //     color: {primary: '#e74c3c', secondary: '#f58f84'},
  //     contactMethod: null,
  //     created: firebase.firestore.Timestamp.fromDate(new Date()),
  //     draggable: false,
  //     end: addTwoDays,
  //     eventID: 'testId',
  //     faceToFacePhone: 12341234,
  //     location: null,
  //     meetMethod: 'faceToFace',
  //     onlineAppointmentPhone: {
  //       phoneAreaCode: '51',
  //       phoneRest: 50005
  //     },
  //     rejected: false,
  //     resizable: {beforeStart: true, afterEnd: true},
  //     skypeName: null,
  //     specialistID: 'specialist2',
  //     start: date.toString(),
  //     title: 'test Appointment',
  //     whatsappNumber: null
  //   };
  //   events.push(blockedEvent)
  //   console.log('events pushed', events);
  //   console.log('moment time', date.toString());
  //   return events;
  // };

  getEvents(user) {
    const specialist = user.specialist;
    // Pull appointments from service
    const colRef: AngularFirestoreCollection =
    this.afs.collection('appointments', ref =>
      ref.where('specialistID', '==', `${specialist}`)
      .where('accepted', '==', true)
      .orderBy('start'));
    this.events$ = this.bookingService.getSpecificAppointments(colRef);
    // this.events$.pipe(
    //   takeUntil(this.destroy$),
    // ).subscribe((events: any) => {
    //   console.log('events', events);
    //   this.events = this.mapEvents(events);
    //   // this.events = events;
    // });
  }

  injectEventOverviewTitle(timeOut) {
    setTimeout(() => {
      const titleContainer = document.querySelector('.cal-open-day-events');
      const title = 'Events';
      const el = `<h1 class="events-title">${title}</h1`;
      titleContainer.insertAdjacentHTML('afterbegin', `${el}`);
    }, timeOut);
  }

  // Show Events for that day
  dayClicked({ date, events }: { date: Date; events: Appointment[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.injectEventOverviewTitle(50);
      }
    }
  }

  // Mobile date display
  getTimeAndDate() {
    const date  = new Date(this.startDate);
    const startDay = date.getDate().toString();
    const startMonth = this.monthList[date.getMonth()];
    const startYear = date.getFullYear().toString();
    const startHours = date.getHours().toString();
    const startMinutes = this.convertMinutes(date);

    this.start = {
      startDay, startMonth, startYear, startHours, startMinutes
    };

    this.getEndTimeAndDate(date);
  }

  getEndTimeAndDate(dateObj) {
    const date = this.utils.dateAdd(dateObj, 'minute', 60);
    this.end.endDay = date.getDate().toString();
    this.end.endMonth = this.monthList[date.getMonth()];
    this.end.endYear = date.getFullYear().toString();
    this.end.endHours = date.getHours().toString();
    this.end.endMinutes = this.convertMinutes(date);

    this.endDate = date;
  }

  convertMinutes(date) {
    const minutes = ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return minutes;
  }

  // REFRESH CALENDAR FUNCTION
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    const start = newStart;
    const end = newEnd;
    const data = {
      start: new Date(start).toString(),
      end: new Date(end).toString()
    };
    const obj: Appointment = {...event};
    this.bookingService.updateEvent(obj.eventID, data);
  }

  openEventDetailDialog(event) {
    this.dialog.open(AppointmentDetailDialogComponent, {
      data: {
        event: event,
      },
      panelClass: 'event-detail-dialog'
    });
  }

  hourClicked(date) {
    this.showStepTwoMobile = true;
    this.startDate = date;
    this.getTimeAndDate();
  }

  closeMobileAppointment() {
    this.showStepTwoMobile = false;
  }

  ////////////////
  // For Users

  deleteEventDialog(event) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        eventID: event.eventID,
        eventTitle: event.title,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = event.eventID;
        this.bookingService.deleteEvent(id);
      } else if (result === false) {
        return null;
      }
    });
  }

  addMobileEvent() {
    const specialistID = this.specialist.specialistID;
    const f2fPhone = this.appointmentForm.controls['meetMethod'].value === 'faceToFace' ? this.user.basicData.phoneNumber : null;

    const data: Appointment = {
      accepted: false,
      rejected: false,
      created: new Date(),
      title: 'First consultation',
      start: this.startDate.toString(),
      end: this.endDate.toString(),
      color: {
        primary: '#2ecc71',
        secondary: '#5ec78a',
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      specialistID: specialistID,
      clientID: this.user.uid,
      members: [this.user.uid, this.specialist.uid],
      meetMethod: this.appointmentForm.get('meetMethod').value,
      contactMethod: this.appointmentForm.controls['contactMethod'] ? this.appointmentForm.get('contactMethod').value : null,
      faceToFacePhone: f2fPhone,
      whatsappNumber: this.appointmentForm.controls['wappAreaCode'] ?
        this.appointmentForm.get('wappAreaCode').value + this.appointmentForm.get('wappRest').value : null,
      skypeName: this.appointmentForm.controls['skypeName'] ? this.appointmentForm.get('skypeName').value : null,
      onlineAppointmentPhone: {
        phoneAreaCode: this.appointmentForm.controls['phoneAreaCode'] ? this.appointmentForm.get('phoneAreaCode').value : null,
        phoneRest: this.appointmentForm.controls['phoneAreaCode'] ? this.appointmentForm.get('phoneRest').value : null
      }
    };

    // Update request amount on specialist
    this.updateSpecialist(this.specialist);
    this.updateUser(this.user);

    // add event to db
    this.bookingService.addEvent(data, this.user);
  }

  updateUser(user) {
    const data = {
      status: {
        appointment: true,
        appointmentAccepted: false,
        appointmentCompleted: false,
        accepted: false,
        signUpCompleted: true,
        subscriptionValid: false,
      }
    };
    this.userService.updateUser(user.uid, data);
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

  // Chat
  chat(id) {
    this.threadService.createThread(id);
  }

  // Misc
  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
