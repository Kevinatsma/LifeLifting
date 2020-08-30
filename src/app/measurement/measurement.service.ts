import { Injectable, OnDestroy } from '@angular/core';
import { Measurement } from './measurement.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService implements OnDestroy {
  measurementDoc: AngularFirestoreDocument;
  measurements$: Subscription;

  constructor( private afs: AngularFirestore,
               private snackBar: MatSnackBar,
               private userService: UserService
               ) { }

  ngOnDestroy() {
    this.measurements$.unsubscribe();
  }

  getMeasurements(colRef) {
    this.measurements$ = colRef.valueChanges().subscribe(measurements => {
      return measurements;
    });
  }

  addMeasurement(data) {
    this.afs.collection<Measurement>(`measurements`).add(data)
    .then(docRef => {
      console.log('Document written with ID: ', docRef.id);
      const measurementData = {
        measurementID: docRef.id
      };
      this.updateMeasurement(docRef.id, measurementData);
    })
    .then(() => {
      if (data.weight !== undefined) {
        const weightData = {
          currentWeight: data.weight
        };
        const uid = data.clientID;

        this.userService.updateUser(uid, weightData);
      }
    })
    .then(() => {
      // Show Snackbar
      const message = 'The Measurement was added succesfully';
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }

  updateMeasurement(id, data) {
    this.measurementDoc = this.afs.doc<Measurement>(`measurements/${id}`);
    this.measurementDoc.update(data)
    .then(() => {
      if (data.weight !== undefined) {
        const weightData = {
          currentWeight: data.weight
        };
        const uid = data.clientID;

        this.userService.updateUser(uid, weightData);
      }
    });
  }

  deleteMeasurement(id) {
    this.measurementDoc = this.afs.doc<Measurement>(`measurements/${id}`);
    this.measurementDoc.delete();
  }
}
