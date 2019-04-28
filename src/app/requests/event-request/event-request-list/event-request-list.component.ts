import { Component, OnInit, Input, Output } from '@angular/core';
import { BookingService } from './../../../booking/booking.service';
import { Observable } from 'rxjs';
import { User } from './../../../user/user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Appointment } from './../../../booking/appointment.model';

@Component({
  selector: 'app-event-request-list',
  templateUrl: './event-request-list.component.html',
  styleUrls: ['./event-request-list.component.scss'],
})
export class EventRequestListComponent implements OnInit {
  @Input() user: User;
  events: Observable<Appointment[]>;
  eventLength: number;
  eventArr = true;

  constructor( private bookingService: BookingService,
               private afs: AngularFirestore) { }

  ngOnInit() {
    setTimeout(() => {
      this.getEvents(this.user);
    }, 500);
  }

  getEvents(user) {
    const colRef = this.afs.collection('appointments', ref =>
    ref.where('specialistID', '==', `specialist${user.sID}`)
    .where('accepted', '==', false)
    .where('rejected', '==', false)
    .orderBy('created'));

    this.events = this.bookingService.getSpecificAppointments(colRef);
    this.events.subscribe(events => {
      this.eventArr = events.length > 0;

      // TODO UPDATE SPECIALIST HASEVENTREQUEST variable
      this.eventLength = events.length;
    });
  }

}
