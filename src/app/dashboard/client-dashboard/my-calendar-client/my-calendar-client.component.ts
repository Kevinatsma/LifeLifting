import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEventTitleFormatter } from 'angular-calendar';
import { AuthService } from '../../../core/auth/auth.service';
import { CustomEventTitleFormatter } from '../../../booking/custom-event-title-formatter.provider';
import { DashboardService } from '../../dashboard.service';

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
  signupCalendar = false;

  constructor( public auth: AuthService,
               private dbService: DashboardService) {
                 setTimeout(() => {
                  this.signupCalendar = this.dbService.isSignUpCalendar;
                 });
                 setTimeout(() => {
                   this.signupCalendar = this.dbService.isSignUpCalendar;
                 }, 1000);
               }

  ngOnInit() {
  }

}
