import { Component, OnInit, Input } from '@angular/core';
import { BookingService } from './../../../booking/booking.service';
import { Observable } from 'rxjs';
import { User } from './../../../user/user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Appointment } from 'src/app/booking/appointment.model';

@Component({
  selector: 'app-event-request-list',
  templateUrl: './event-request-list.component.html',
  styleUrls: ['./event-request-list.component.scss'],
})
export class EventRequestListComponent implements OnInit {
  @Input() user: User;
  events: Observable<Appointment[]>;
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
    ref.where('members', 'array-contains', `${user.uid}`)
    .where('accepted', '==', false)
    .orderBy('created'));

    this.events = this.bookingService.getSpecificAppointments(colRef);
    this.events.subscribe(events => {
      console.log(events);
      this.eventArr = events.length > 0;
      console.log(this.eventArr);
    });
  }

}
