import { Component, OnInit, Input, Output } from '@angular/core';
import { BookingService } from './../../../booking/booking.service';
import { Observable } from 'rxjs';
import { User } from './../../../user/user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Appointment } from './../../../booking/appointment.model';
import { MatDialog } from '@angular/material';
import { Specialist } from './../../../specialists/specialist.model';
import { SpecialistService } from './../../../specialists/specialist.service';

@Component({
  selector: 'app-event-request-list',
  templateUrl: './event-request-list.component.html',
  styleUrls: ['./event-request-list.component.scss'],
})
export class EventRequestListComponent implements OnInit {
  @Input() user: User;
  specialist: Specialist;
  events: Observable<Appointment[]>;
  eventLength: number;
  eventArr = true;

  constructor( private bookingService: BookingService,
               private afs: AngularFirestore,
               private specialistService: SpecialistService,
               private dialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.getEvents(this.user);
      this.getSpecialist(this.user);
    }, 500);
  }

  getSpecialist(user) {
    const sID = 'specialist' + user.sID;
    this.specialistService.getSpecialistData(sID).subscribe(specialist => {
      this.specialist = specialist;
    });
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
      this.eventLength = events.length;
    });
  }


  closeDialog() {
    const data = {
      stats: {
        amountOfEventRequests: this.eventLength
      }
    };
    this.specialistService.updateSpecialist(this.specialist.specialistID, data);
    this.dialog.closeAll();
  }

}
