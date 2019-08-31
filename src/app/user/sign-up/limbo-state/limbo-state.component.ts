import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../user.model';
import { Specialist } from './../../../specialists/specialist.model';
import { Appointment } from './../../../booking/appointment.model';
import { BookingService } from './../../../booking/booking.service';
import { UserService } from '../../user.service';
import { AuthService } from './../../../core/auth/auth.service';
import { SpecialistService } from './../../../specialists/specialist.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-limbo-state',
  templateUrl: './limbo-state.component.html',
  styleUrls: ['./limbo-state.component.scss']
})
export class LimboStateComponent implements OnInit, OnDestroy {
  user: User;
  user$: Subscription;
  specialist: Specialist;
  specialist$: Subscription;
  events: Appointment[];
  events$: Subscription;
  event: Appointment;

  // Toggles
  showSpecialist = false;

  constructor( private userService: UserService,
               public auth: AuthService,
               private afs: AngularFirestore,
               private bookingService: BookingService,
               private specialistService: SpecialistService,
               public router: Router
    ) { }

  ngOnInit() {
    this.redirect();
  }

  ngOnDestroy() {
    if (this.user$ !== undefined) {
      this.user$.unsubscribe();
    }
    if (this.specialist$ !== undefined) {
      if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
    }
    if (this.events$ !== undefined) {
      this.events$.unsubscribe();
    }
  }

  redirect() {
    if ( this.auth.currentUserId ) {
      this.getUser();
    } else {
      this.router.navigate(['../']);
    }
  }
  // Getters
  getUser() {
    const id = this.auth.currentUserId;
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      this.specialist$ = this.specialistService.getSpecialistData(user.specialist).subscribe(specialist => this.specialist = specialist);
      this.getAppointments(user);
    });
  }

  getAppointments(user) {
    const colRef: AngularFirestoreCollection =
      this.afs.collection('appointments', ref => ref.where('members', 'array-contains', `${user.uid}`)
        .limit(1)
        .orderBy('created', 'desc'));
    this.events$ = this.bookingService.getSpecificAppointments(colRef).subscribe(events => {
      this.events = events;
    });
  }

  // Choose new specialist
  resetSpecialist(user) {
    const data = {
      specialist: null,
      appointment: null,
      status: {
        appointmentAccepted: false,
        appointmentCompleted: false,
        accepted: false,
      }
    };
    this.userService.updateUser(user.uid, data);
    this.router.navigate(['signup/step-three']);
  }

  // Request new appointment if it isn't accepted
  requestNewEvent(user) {
    const data = {
      status: {
        appointment: false,
        appointmentAccepted: false
      }
    };
    this.userService.updateUser(user.uid, data);
    this.router.navigate(['../signup/step-four']);
  }

  // Toggles
  toggleSpecialist() {
    this.showSpecialist = !this.showSpecialist;
  }
}
