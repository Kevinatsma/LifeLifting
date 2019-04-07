import { Component, OnInit } from '@angular/core';
import { User } from '../../user.model';
import { Specialist } from 'src/app/specialists/specialist.model';
import { Appointment } from 'src/app/booking/appointment.model';
import { BookingService } from 'src/app/booking/booking.service';
import { UserService } from '../../user.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SpecialistService } from 'src/app/specialists/specialist.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-limbo-state',
  templateUrl: './limbo-state.component.html',
  styleUrls: ['./limbo-state.component.scss']
})
export class LimboStateComponent implements OnInit {
  user: User;
  specialist: Specialist;
  events: Appointment[];

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

  redirect() {
    if ( this.auth.currentUserId ) {
      this.getUser();
    } else {
      this.router.navigate(['../']);
    }
  }
  // Getters

  // Get user
  getUser() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      // Get Specialist
      this.specialistService.getSpecialistData(user.specialist).subscribe(specialist => this.specialist = specialist);
      this.getAppointments(user);
    });
  }

  // Get appointments

  getAppointments(user) {
    const colRef: AngularFirestoreCollection = this.afs.collection('appointments', ref => ref.where('clientID', '==', `${user.uid}`));
    this.bookingService.getSpecificAppointments(colRef).subscribe(events => this.events = events);
  }

  // Toggles
  toggleSpecialist() {
    this.showSpecialist = !this.showSpecialist;
  }
}
