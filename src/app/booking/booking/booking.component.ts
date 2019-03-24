import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Subject, Observable, of } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
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
import { map, switchMap } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AddAppointmentDialogComponent } from './../../shared/dialogs/add-appointment-dialog/add-appointment-dialog.component';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

@Component({
  selector: 'app-booking-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./booking.component.scss'],
  templateUrl: './booking.component.html'
})

export class BookingComponent implements OnInit {
  user: User;
  specialist: Specialist;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ event: Appointment }>>>;
  // events$: Observable<Array<CalendarEvent<{ film: Film }>>>;
  // events$: Observable<Appointment[]>;

  modalData: {
    action: string;
    event: Appointment;
  };

  actions: CalendarEventAction[] = [
    // {
    //   label: '<i class="fa fa-fw fa-pencil"></i>',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.handleEvent('Edited', event);
    //   }
    // },
    // {
    //   label: '<i class="fa fa-fw fa-times"></i>',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter(iEvent => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   }
    // }
  ];

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


  // TODO: OPEN MAT DIALOG AND SEND EVENT OBJECT TO DISPLAY CORRECTLY
  openEventDetailDialog() {
    alert('TODO');
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
