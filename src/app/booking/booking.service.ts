import { Injectable, OnInit } from '@angular/core';
import { Appointment } from './appointment.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService implements OnInit {
  booked = false;
  appointmentsCol: AngularFirestoreCollection;
  appointments: Observable<Appointment[]>;

  constructor( private afs: AngularFirestore,
               public snackbar: MatSnackBar) { }

  ngOnInit() {
  }

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

  addEvent(data) {
    this.afs.collection<Appointment>(`appointments`).add(data)
    .then(() => {
      // Show Snackbar
      const message = `The ${data.appointmentName} was added succesfully`;
      const action = 'Close';

      this.snackbar.open(message, action, {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }

  getAppointments() {
    this.appointmentsCol = this.afs.collection<Appointment>('appointments');
    this.appointments = this.appointmentsCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Appointment;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.appointments;
  }
}
