import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FirstConsultation } from './first-consultation.model';

@Injectable({
  providedIn: 'root'
})
export class FirstConsultationService {

  firstConsultationDoc: AngularFirestoreDocument<FirstConsultation>;

  constructor( private afs: AngularFirestore,
               public dialog: MatDialog,
               private snackBar: MatSnackBar
               ) { }


  addFirstConsultation(data) {
    this.afs.collection<FirstConsultation>(`first-consultations`).add(data)
    .then(credential => {
      const idData = {
        fucID: credential.id
      };
      this.updateFirstConsultation(credential.id, idData);
    })
    .then(() => {
      // Show Snackbar
      const message = `Document was added succesfully`;
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 10000,
        panelClass: ['success-snackbar']
      });
      this.dialog.closeAll();
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }

  updateFirstConsultation(id, data) {
    this.firstConsultationDoc = this.afs.doc<FirstConsultation>(`first-consultations/${id}`);
    this.firstConsultationDoc.update(data)
    .then(() => {
      // Show Snackbar
      const message = `Follow-up Consultation was edited succesfully`;
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 10000,
        panelClass: ['success-snackbar']
      });
      this.dialog.closeAll();
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }

  deleteFirstConsultation(id) {
    this.firstConsultationDoc = this.afs.doc<FirstConsultation>(`first-consultations/${id}`);
    this.firstConsultationDoc.delete();
  }
}
