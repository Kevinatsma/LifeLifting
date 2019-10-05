import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FirstConsultation } from './first-consultation.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FirstConsultationService {

  firstConsultationDoc: AngularFirestoreDocument<FirstConsultation>;

  constructor( private afs: AngularFirestore,
               public dialog: MatDialog,
               private snackBar: MatSnackBar,
               private userService: UserService
               ) { }


  getFirstConsultationDataById(id) {
    const firstConsultationDoc = this.afs.doc<FirstConsultation>(`first-consultations/${id}`);
    const firstConsultation = firstConsultationDoc.valueChanges();
    return firstConsultation;
  }

  getFirstConsultations(colRef) {
    colRef.valueChanges().subscribe(consultations => {
      return consultations;
    });
  }

  addFirstConsultation(data) {
    this.afs.collection<FirstConsultation>(`first-consultations`).add(data)
    .then(credential => {
      const idData = {
        ficID: credential.id
      };
      this.updateFirstConsultation(credential.id, idData);
    })
    .then(() => {
      const formulaData = {
        formulas: {
          height: data.basicData.height,
          birthDate: data.basicData.birthDate,
          sex: data.basicData.sex
        }
      };
      const uid = data.clientID;
      this.userService.updateUser(uid, formulaData);
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
      console.error(error.message);
    });
  }

  updateFirstConsultation(id, data) {
    this.firstConsultationDoc = this.afs.doc<FirstConsultation>(`first-consultations/${id}`);
    this.firstConsultationDoc.update(data)
    .then(() => {
      // Show Snackbar
      const message = `First Consultation was updated succesfully`;
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 10000,
        panelClass: ['success-snackbar']
      });
      this.dialog.closeAll();
    })
    .catch(error => {
      console.error(error.message);
    });
  }

  deleteFirstConsultation(id) {
    this.firstConsultationDoc = this.afs.doc<FirstConsultation>(`first-consultations/${id}`);
    this.firstConsultationDoc.delete();
  }
}
