import { Injectable } from '@angular/core';
import { Measurement } from './measurement.model';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  measurementDoc: AngularFirestoreDocument;

  constructor( private afs: AngularFirestore,
               private snackBar: MatSnackBar,
               ) { }


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
    this.measurementDoc.update(data);
  }

  deleteMeasurement(id) {
    this.measurementDoc = this.afs.doc<Measurement>(`measurements/${id}`);
    this.measurementDoc.delete();
  }
}
