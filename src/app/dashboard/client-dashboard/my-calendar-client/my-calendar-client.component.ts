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
import { BookingService } from '../../../booking/booking.service';
import { User } from '../../../user/user.model';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../user/user.service';
import { Appointment } from '../../../booking/appointment.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { SpecialistService } from '../../../specialists/specialist.service';
import { Specialist } from '../../../specialists/specialist.model';
import { ChatThreadService } from '../../../chat/chat-thread.service';
import { AddAppointmentDialogComponent } from '../../../shared/dialogs/add-appointment-dialog/add-appointment-dialog.component';
import { AppointmentDetailDialogComponent } from '../../../shared/dialogs/appointment-detail-dialog/appointment-detail-dialog.component';
import { CustomEventTitleFormatter } from '../../../booking/custom-event-title-formatter.provider';

@Component({
  selector: 'app-my-calendar-client-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./my-calendar-client.component.scss'],
  templateUrl: './my-calendar-client.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})

export class MyCalendarClientComponent implements OnInit {

  constructor( public auth: AuthService) {}

  ngOnInit() {
  }

}
