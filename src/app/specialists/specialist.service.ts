import { Injectable } from '@angular/core';
import { Specialist } from './specialist.model';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  specialistCol: AngularFirestoreCollection<Specialist>;
  specialists: Observable<Specialist[]>;
  specialistDoc: AngularFirestoreDocument<Specialist>;
  specialist: Observable<Specialist>;

  constructor( private afs: AngularFirestore,
               public snackBar: MatSnackBar,
               private afAuth: AngularFireAuth
             ) {
    this.specialistCol = this.afs.collection<Specialist>(`specialists`);
    this.specialists = this.getSpecialists();
  }

  getSpecialistData(id) {
    this.specialistDoc = this.afs.doc<Specialist>(`specialists/${id}`);
    this.specialist = this.specialistDoc.valueChanges();
    return this.specialist;
  }

  getSpecialists() {
    this.specialists = this.specialistCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Specialist;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.specialists;
  }

  emailSignUp(email: string, password: string, formData: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      this.updateUserData(credential.user, formData);
    })
    .then(() => console.log('Congratulations. The specialists account has been created!'))
    .then(() => {
      this.afAuth.auth.currentUser.sendEmailVerification()
        .then(() => console.log('We sent him/her an email verification'))
        .catch(error => console.log(error.message));
    });
  }

  private updateUserData(user, formData) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      sID: formData.specialistID,
      email: formData.email,
      displayName: formData.firstName + ' ' + formData.lastName,
      photoURL: user.photoURL,
      roles: {
        member: true,
        specialist: true,
        admin: false
      },
      signupCompleted: false,
      packageChoice: 'NaN',
      appointment: 'NaN',
    };
    return userRef.set(data, { merge: true });
  }

  addSpecialist(data) {
    this.afs.collection<Specialist>(`specialists`).add(data)
    .then(() => {
      // Show Snackbar
      const message = 'The Specialist was added succesfully';
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 4000,
        panelClass: ['success-snackbar']
      });
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }

  updateSpecialist(id, data) {
    this.specialistDoc = this.afs.doc<Specialist>(`specialists/${id}`);
    this.specialistDoc.update(data);
  }

  deleteSpecialist(id) {
    this.specialistDoc = this.afs.doc<Specialist>(`specialists/${id}`);
    this.specialistDoc.delete();
  }
}
