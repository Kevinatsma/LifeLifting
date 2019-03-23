import { Injectable, OnInit } from '@angular/core';
import { Appointment } from './appointment.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService implements OnInit {
  booked = false;
  eventDoc: AngularFirestoreDocument;
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
    return this.afs.collection('appointments').add(data)
    .then(docRef => {
      console.log('Document written with ID: ', docRef.id);
      const eventData = {
        eventID: docRef.id
      };
      this.updateEvent(docRef.id, eventData);
      // console.log('You can now also access .this as expected: ', this.foo);
    })
    .catch(error => console.error('Error adding document: ', error))
    .then(() => {
      // Show Snackbar
      const message = `${data.title} was added succesfully`;
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


  updateEvent(id, data) {
    this.eventDoc = this.afs.doc<Appointment>(`appointments/${id}`);
    this.eventDoc.update(data);
  }

  deleteEvent(id) {
    console.log(id);
    this.eventDoc = this.afs.doc(`appointments/${id}`);
    this.eventDoc.delete().catch((error) => console.error(error.message));
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
