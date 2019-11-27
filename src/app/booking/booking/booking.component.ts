import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { Observable, Subscription } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter
} from 'angular-calendar';
import { BookingService } from '../booking.service';
import { User } from './../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../../user/user.service';
import { Appointment } from '../appointment.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { SpecialistService } from './../../specialists/specialist.service';
import { Specialist } from './../../specialists/specialist.model';
import { ChatThreadService } from './../../chat/chat-thread.service';
import { AddAppointmentDialogComponent } from './../../shared/dialogs/add-appointment-dialog/add-appointment-dialog.component';
import { AppointmentDetailDialogComponent } from './../../shared/dialogs/appointment-detail-dialog/appointment-detail-dialog.component';
import { CustomEventTitleFormatter } from '../custom-event-title-formatter.provider';
import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-booking-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./booking.component.scss'],
  templateUrl: './booking.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})

export class BookingComponent implements OnInit, OnDestroy {
  user: User;
  specialist: Specialist;
  user$: Subscription;
  specialist$: Subscription;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ event: Appointment }>>>;

  // Spinner
  spinner = {
    color: 'primary',
    mode: 'indeterminate',
    value: 70
  };

  modalData: {
    action: string;
    event: Appointment;
  };
  activeDayIsOpen = true;
  excludeDays: number[] = [0, 6];

  constructor( private userService: UserService,
               public auth: AuthService,
               private dialog: MatDialog,
               private bookingService: BookingService,
               private specialistService: SpecialistService,
               private utilService: UtilService,
               private threadService: ChatThreadService,
               public location: Location,
               private afs: AngularFirestore) {
               }



  ngOnInit() {
    this.getUser();
    this.getEvents();
    this.replaceDates();
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
  }

  replaceDates() {
    this.utilService.replaceCalendarHeaderDates();
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.user$ =  this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      this.specialist$ = this.specialistService.getSpecialistData(user.specialist).subscribe(specialist => {
        this.specialist = specialist;
      });
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

  getEvents() {
    const colRef: AngularFirestoreCollection = this.afs.collection('appointments');
    this.events$ = this.bookingService.getSpecificAppointments(colRef);
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
      }
    }
  }

  hourClicked(date) {
    this.dialog.open(AddAppointmentDialogComponent, {
      data: {
        user: this.user,
        specialist: this.specialist,
        date: date
      },
      panelClass: 'add-appointment-dialog'
    });
  }


  // EDIT ON DRAG
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


  // OPEN MAT DIALOG AND SEND EVENT OBJECT TO DISPLAY CORRECTLY
  openEventDetailDialog(event) {
    const dialogRef = this.dialog.open(AppointmentDetailDialogComponent, {
      data: {
        event: event
      },
      panelClass: 'event-detail-dialog'
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.bookingService.editShow) {
        this.bookingService.toggleEdit();
      } else {
        return;
      }
    });
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

  addEvent() {
    this.dialog.open(AddAppointmentDialogComponent, {
      data: {
        user: this.user,
        specialist: this.specialist
      },
      panelClass: 'add-appointment-dialog'
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
