import { Injectable, OnDestroy } from '@angular/core';
import { Appointment } from './appointment.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService implements OnDestroy {
  booked = false;
  eventDoc: AngularFirestoreDocument;
  appointmentsCol: AngularFirestoreCollection;
  events$: Observable<Array<CalendarEvent<{ event: Appointment }>>>;

  // Edit state
  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();
  stateChange$: Subscription;

  constructor( private afs: AngularFirestore,
               private userService: UserService,
               public snackbar: MatSnackBar) {
                this.stateChange$ = this.editStateChange.subscribe((value) => {
                  this.editShow = value;
                });
               }

  ngOnDestroy() {
    this.stateChange$.unsubscribe();
  }

  addOnlineAppointment(data, path, user) {
    this.afs.collection<Appointment>(`${path}`).add(data)
    .then(() => {
      this.booked = true;
      return this.booked;
    })
    .catch(error => {
      console.error(error.message);
    });
  }

  addEvent(data, user) {
    return this.afs.collection('appointments').add(data)
    .then(docRef => {
      const eventData = {
        eventID: docRef.id
      };
      this.updateEvent(docRef.id, eventData);
    })
    .then(() => {
      const userData = {
        status: {
          accepted: user.status.accepted || false,
          signUpCompleted: user.status.signUpCompleted || true,
          appointment: true,
          appointmentAccepted: user.status.appointmentAccepted || false,
          appointmentCompleted: user.status.appointmentCompleted || false,
          appointmentRejected: user.status.appointmentRejected || false,
          subscriptionValid: user.status.subscriptionValid || false
        }
      };
      this.userService.updateUser(user.uid, userData);
    })
    .then(() => {
      // Show Snackbar
      const message = `${data.title} was requested succesfully`;
      const action = 'Close';

      this.snackbar.open(message, action, {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    })
    .catch(error => console.error('Error adding document: ', error.message));
  }


  updateEvent(id, data) {
    this.eventDoc = this.afs.doc<Appointment>(`appointments/${id}`);
    this.eventDoc.update(data);
  }

  deleteEvent(id) {
    this.eventDoc = this.afs.doc(`appointments/${id}`);
    this.eventDoc.delete().catch((error) => console.error(error.message));
  }

  // Toggles
  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  // Getters

  getSpecificAppointments(colRef) {
    this.appointmentsCol = colRef;
    this.events$ = this.appointmentsCol.snapshotChanges().pipe(map(events => {
      return events.map(event => {
        const data = event.payload.doc.data() as Appointment;
        // const id = event.payload.doc.id;
        const start = data.start;
        const end = data.end;
        const eventData = {
          accepted: data.accepted,
          rejected: data.rejected,
          created: data.created,
          eventID: data.eventID,
          title: data.title,
          start: new Date(start),
          end: new Date(end),
          color: data.color,
          draggable: data.draggable,
          resizable: {
            beforeStart: data.resizable.beforeStart, // this allows you to configure the sides the event is resizable from
            afterEnd: data.resizable.afterEnd
          },
          clientID: data.clientID,
          specialistID: data.specialistID,
          meetMethod: data.meetMethod,
          contactMethod: data.contactMethod,
          onlineAppointmentPhone: data.onlineAppointmentPhone,
          whatsappNumber: data.whatsappNumber,
          skypeName: data.skypeName,
          faceToFacePhone: data.faceToFacePhone,
          location: data.location,
        };
        return {...eventData };
      });
    }));
    return this.events$;
  }
}
