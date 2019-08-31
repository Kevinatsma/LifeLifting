import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { BookingService } from './../../../booking/booking.service';
import { Observable, Subscription } from 'rxjs';
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
export class EventRequestListComponent implements OnInit, OnDestroy {
  @Input() user: User;
  specialist: Specialist;
  specialist$: Subscription;
  events: Observable<Appointment[]>;
  events$: Subscription;
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

  ngOnDestroy() {
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
    this.events$.unsubscribe();
    this.updateSpecialist();
  }

  getSpecialist(user) {
    const sID = 'specialist' + user.sID;
    this.specialist$ = this.specialistService.getSpecialistData(sID).subscribe(specialist => {
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
    this.events$ = this.events.subscribe(events => {
      this.eventArr = events.length > 0;
      this.eventLength = events.length;
    });
  }

  updateSpecialist() {
    const newStat = this.eventLength;
    const specialistData = {
      stats: {
        amountOfEventRequests: newStat
      }
    };
    const sID = this.specialist.specialistID;
    this.specialistService.updateSpecialist(sID, specialistData);
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
