import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FollowUpConsultation } from './follow-up-consultation.model';

@Injectable({
  providedIn: 'root'
})
export class FollowUpConsultationService {

  followUpDoc: AngularFirestoreDocument<FollowUpConsultation>;

  constructor( private afs: AngularFirestore,
               public dialog: MatDialog,
               private snackBar: MatSnackBar
               ) { }


  addFollowUpConsultation(data) {
    this.afs.collection<FollowUpConsultation>(`follow-ups`).add(data)
    .then(credential => {
      const idData = {
        fucID: credential.id
      };
      this.updateFollowUpConsultation(credential.id, idData);
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

  updateFollowUpConsultation(id, data) {
    this.followUpDoc = this.afs.doc<FollowUpConsultation>(`follow-ups/${id}`);
    this.followUpDoc.update(data)
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

  deleteFollowUpConsultation(id) {
    this.followUpDoc = this.afs.doc<FollowUpConsultation>(`follow-ups/${id}`);
    this.followUpDoc.delete();
  }
}
