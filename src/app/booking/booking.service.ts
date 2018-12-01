import { Injectable } from '@angular/core';
import { Appointment } from './appointment.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  booked = false;

  constructor( private afs: AngularFirestore) { }

  addAppointment(data, path, user) {
    this.afs.collection<Appointment>(`${path}`).doc(`${data.date}`).set(data, {merge: false})
    .then(() => {
      this.booked = true;
      return this.booked;
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }
}
