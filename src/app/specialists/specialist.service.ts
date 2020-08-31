import { Injectable } from '@angular/core';
import { Specialist } from './specialist.model';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../user/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {
  specialistCol: AngularFirestoreCollection<Specialist>;
  specialists: Observable<Specialist[]>;
  specialistDoc: AngularFirestoreDocument<Specialist>;
  specialist: Observable<Specialist>;
  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( private afs: AngularFirestore,
               private userService: UserService,
               public snackBar: MatSnackBar,
               private afAuth: AngularFireAuth
             ) {
    this.specialistCol = this.afs.collection<Specialist>(`specialists`);
    this.specialists = this.getSpecialists();
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });
  }

  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  getSpecialistData(sID) {
    this.specialistDoc = this.afs.doc<Specialist>(`specialists/${sID}`);
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
    })
    .then((credential) => {
      return credential;
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
      photoURL: user.photoURL || formData.photoURL,
      roles: {
        client: true,
        specialist: true,
        admin: false
      },
      status: {
        accepted: false,
        signUpCompleted: false,
        appointment: false,
      },
      signUpDate: new Date(),
      packageChoice: 'NaN',
    };
    this.addSpecialist(formData, user);
    return userRef.set(data, { merge: true });
  }

  addSpecialist(formData, user) {
    const data = {
      uid: user.uid,
      specialistID: formData.specialistID,
      firstName: formData.firstName,
      lastName: formData.lastName,
      photoURL: formData.photoURL,
      email: formData.email,
      description: formData.description,
      phoneNumber: formData.phoneNumber,
      position: formData.position,
      timeZone: formData.timeZone,
      yearsOfExperience: formData.yearsOfExperience,
      patientsTotal: formData.patientsTotal,
      speciality: formData.speciality,
      city: formData.city,
      country: formData.country,
      languages: formData.languages,
      reviews: formData.reviews,
    };
    this.afs.doc<Specialist>(`specialists/${formData.specialistID}`).set(data,  {merge: true})
    .then(() => {
      // Show Snackbar
      const message = 'The Specialist was added succesfully';
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

  updateSpecialist(id, data) {
    this.specialistDoc = this.afs.doc<Specialist>(`specialists/${id}`);
    this.specialistDoc.update(data);
  }

  deleteSpecialist(id) {
    this.specialistDoc = this.afs.doc<Specialist>(`specialists/${id}`);
    this.specialistDoc.delete();
  }
}
