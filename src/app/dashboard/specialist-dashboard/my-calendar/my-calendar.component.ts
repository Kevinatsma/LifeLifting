import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { Observable } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter
} from 'angular-calendar';
import { BookingService } from './../../../booking/booking.service';
import { User } from './../../../user/user.model';
import { AuthService } from './../../../core/auth/auth.service';
import { UserService } from './../../../user/user.service';
import { Appointment } from './../../../booking/appointment.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { ConfirmDialogComponent } from './../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { SpecialistService } from './../../../specialists/specialist.service';
import { Specialist } from './../../../specialists/specialist.model';
import { ChatThreadService } from './../../../chat/chat-thread.service';
import { AddAppointmentDialogComponent } from './../../../shared/dialogs/add-appointment-dialog/add-appointment-dialog.component';
import { AppointmentDetailDialogComponent } from './../../../shared/dialogs/appointment-detail-dialog/appointment-detail-dialog.component';
import { CustomEventTitleFormatter } from './../../../booking/custom-event-title-formatter.provider';

@Component({
  selector: 'app-my-calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./my-calendar.component.scss'],
  templateUrl: './my-calendar.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})

export class MyCalendarComponent implements OnInit {
  user: User;
  specialist: Specialist;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ event: Appointment }>>>;

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

  activeDayIsOpen = true;

  // TODO: HOOKUP MAT DIALOG INSTEAD OF BOOTSTRAP MODAL
  constructor( private userService: UserService,
               public auth: AuthService,
               private dialog: MatDialog,
               private bookingService: BookingService,
               private specialistService: SpecialistService,
               private threadService: ChatThreadService,
               public location: Location,
               private afs: AngularFirestore) {}



  ngOnInit() {
    this.getUser();
    this.getEvents();
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      // get Specialist
      this.specialistService.getSpecialistData(user.specialist).subscribe(specialist => this.specialist = specialist);
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
    this.events$ = this.bookingService.getAppointments();
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

    console.log(event),

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
