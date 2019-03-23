import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject, Observable, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-booking-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./booking.component.scss'],
  templateUrl: './booking.component.html'
})

export class BookingComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  user: User;
  specialist: Specialist;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  appointmentsCol: AngularFirestoreCollection;
  appointments: Observable<Appointment[]>;

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

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen = true;

  // TODO: HOOKUP MAT DIALOG INSTEAD OF BOOTSTRAP MODAL
  constructor( private userService: UserService,
               private auth: AuthService,
               private dialog: MatDialog,
               private bookingService: BookingService,
               private specialistService: SpecialistService,
               private threadService: ChatThreadService,
               public location: Location,
               private afs: AngularFirestore) {}



  ngOnInit() {
    this.getUser();
    this.appointments = this.bookingService.getAppointments();
    // this.appointmentsCol = this.afs.collection('appointments');
    // this.appointments =  this.appointmentsCol.valueChanges();
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      // get Specialist
      this.specialistService.getSpecialistData(user.specialist).subscribe(specialist => this.specialist = specialist);
    });
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

  // REFRESH CALENDAR FUNCTION
  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd
  // }: CalendarEventTimesChangedEvent): void {
  //   event.start = newStart;
  //   event.end = newEnd;
  //   this.handleEvent('Dropped or resized', event);
  //   this.refresh.next();
  // }


  // TODO: OPEN MAT DIALOG AND SEND EVENT OBJECT TO DISPLAY CORRECTLY
  handleEvent(action: string, event: Appointment): void {
    this.modalData = { event, action };
    this.dialog.open(ConfirmDialogComponent);
  }

  // TODO: LINK TO  FIREBASE
  // addEvent(): void {
  //   this.events.push({
  //     title: 'New event',
  //     start: startOfDay(new Date()),
  //     end: endOfDay(new Date()),
  //     color: colors.red,
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     }
  //   });
  //   this.refresh.next();
  // }

  ////////////////
  // For Users

  addEvent(): void {
    const data: Appointment = {
      title: 'New event',
      start: new Date(),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      specialistID: this.user.specialist,
      clientID: this.user.uid,
    };
    this.bookingService.addEvent(data);
  }

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

  // Chat

  chat(id) {
    this.threadService.createThread(id);
  }

  // Misc

  goBack() {
    this.location.back();
  }
}
