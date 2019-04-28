import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter
} from 'angular-calendar';
import { BookingService } from '../booking.service';
import { User } from '../../user/user.model';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from '../../user/user.service';
import { Appointment } from '../appointment.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { SpecialistService } from '../../specialists/specialist.service';
import { Specialist } from '../../specialists/specialist.model';
import { ChatThreadService } from '../../chat/chat-thread.service';
import { AddAppointmentDialogComponent } from '../../shared/dialogs/add-appointment-dialog/add-appointment-dialog.component';
import { AppointmentDetailDialogComponent } from '../../shared/dialogs/appointment-detail-dialog/appointment-detail-dialog.component';
import { CustomEventTitleFormatter } from '../custom-event-title-formatter.provider';
import { Router, ActivatedRoute } from '@angular/router';
import { EventRequestComponent } from './../../requests/event-request/event-request.component';

@Component({
  selector: 'app-specialist-booking',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./specialist-booking.component.scss'],
  templateUrl: './specialist-booking.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})

export class SpecialistBookingComponent implements OnInit {
  user: User;
  specialist: Specialist;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ event: Appointment }>>>;
  hasEventRequest: boolean;

  // Spinner
  spinner = {
    color: 'primary',
    mode: 'indeterminate',
    value: 70
  };


  // events$: Observable<Array<CalendarEvent<{ film: Film }>>>;
  // events$: Observable<Appointment[]>;

  modalData: {
    action: string;
    event: Appointment;
  };

  actions: CalendarEventAction[];
  activeDayIsOpen = true;

  // TODO: HOOKUP MAT DIALOG INSTEAD OF BOOTSTRAP MODAL
  constructor( private userService: UserService,
               public auth: AuthService,
               private cdr: ChangeDetectorRef,
               private dialog: MatDialog,
               private bookingService: BookingService,
               private specialistService: SpecialistService,
               private threadService: ChatThreadService,
               public location: Location,
               public router: Router,
               private route: ActivatedRoute,
               private afs: AngularFirestore) {
               }



  ngOnInit() {
    this.getUser();
  }

  // Getters

  getUser() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      // get Specialist
      const sID = `specialist${user.sID}`;
      this.specialistService.getSpecialistData(sID).subscribe(specialist => {
        this.specialist = specialist;
        if (this.specialist.stats) {
          if (this.specialist.stats.amountOfEventRequests > 0) {
            this.hasEventRequest = true;
          } else {
            this.hasEventRequest = false;
          }
        } else {
          this.hasEventRequest = false;
        }
        this.cdr.markForCheck();
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

  getEvents(user) {
    // Pull appointments from service
    const colRef: AngularFirestoreCollection =
    this.afs.collection('appointments', ref =>
      ref.where('members', 'array-contains', `${user.uid}`)
      .where('accepted', '==', true)
      .orderBy('start'));
    this.events$ = this.bookingService.getSpecificAppointments(colRef);
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


  // TODO: EDIT ON DRAG

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


  // Dialogs

  openEventDetailDialog(event) {
    this.dialog.open(AppointmentDetailDialogComponent, {
      data: {
        event: event,
      },
      panelClass: 'event-detail-dialog'
    });
  }

  hourClicked(date) {
    this.dialog.open(AddAppointmentDialogComponent, {
      data: {
        user: this.user,
        specialist: this.specialist,
        date: date
      },
    });
  }

  openUnacceptedUsers() {
    const dialogRef = this.dialog.open(EventRequestComponent, {
      data: {
        user: this.user,
        event: event,
      },
      panelClass: 'request-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateHasRequest();
    });
  }

  updateHasRequest() {
    if (this.specialist.stats) {
      if (this.specialist.stats.amountOfEventRequests > 0) {
        this.hasEventRequest = true;
      } else {
        this.hasEventRequest = false;
      }
    } else {
      this.hasEventRequest = false;
    }
  }

  ////////////////
  // For Users

  deleteEventDialog(event) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        eventID: event.eventID,
        eventTitle: event.title,
      },
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

  addEvent() {
    this.dialog.open(AddAppointmentDialogComponent, {
      data: {
        user: this.user,
        specialist: this.specialist
      },
    });
  }

  // Chat

  chat(id) {
    this.threadService.createThread(id);
  }

  // Misc

  goBack() {
    this.location.back();
  }
}
