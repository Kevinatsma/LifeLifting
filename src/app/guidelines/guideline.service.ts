import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { Guideline } from './guideline.model';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Specialist } from '../specialists/specialist.model';
import { UserService } from '../user/user.service';
import { AuthService } from '../core/auth/auth.service';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class GuidelineService {
  specialistID: string;
  user: User;
  guidelineCol: AngularFirestoreCollection<Guideline>;
  guidelines: Observable<Guideline[]>;
  guidelineDoc: AngularFirestoreDocument<Guideline>;
  guideline: Observable<Guideline>;

  specialistGuideCol: AngularFirestoreCollection<Guideline>;
  specialistGuidelines: Observable<Guideline[]>;
  specialistGuideDoc: AngularFirestoreDocument<Guideline>;
  specialistGuide: Observable<Guideline>;

  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( private afs: AngularFirestore,
               private auth: AuthService,
               public snackBar: MatSnackBar,
               private userService: UserService
             ) {
    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.user = user;
      this.specialistID = this.user.sID;
      console.log(this.specialistID);
    });
    this.guidelineCol = this.afs.collection<Guideline>(`guidelines`);
    // this.guidelines = this.getGuidelines();
    this.specialistGuideCol = this.afs.collection<Guideline>(`specialists/${this.specialistID}/guidelines`);
    // this.specialistGuidelines = this.getSpecialistGuidelines();
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });

  }


  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  getGuidelineDataById(id) {
    this.guidelineDoc = this.afs.doc<Guideline>(`guidelines/${id}`);
    console.log(id);
    this.guideline = this.guidelineDoc.valueChanges();
    return this.guideline;
  }

  // getGuidelineData(id, uid) {
  //   this.guidelineDoc = this.afs.doc<Guideline>(`users/${uid}/guidelines/${uid}_${id}`);
  //   this.guideline = this.guidelineDoc.valueChanges();
  //   return this.guideline;
  // }

  // getSpecialistGuidelineData(id) {
  //   const specialistID = this.userService.getSID();
  //   this.specialistGuideCol = this.afs.doc<Guideline>(`specialists/${specialistID}/guidelines/${id}`);
  //   this.specialistGuide = this.specialistGuideCol.valueChanges();
  //   return this.specialistGuide;
  // }

  getGuidelines() {
    this.guidelines = this.guidelineCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Guideline;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.guidelines;
  }

  getSpecialistGuidelines() {
    this.guidelines = this.guidelineCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Guideline;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.guidelines;
  }

  addGuideline(data, uid) {
    this.afs.collection<Guideline>(`guidelines`).doc(`${data.productID}`).set(data, {merge: true})
    .then(() => {
      this.afs.collection<Guideline>(`specialists/specialist${this.specialistID}/guidelines`)
        .doc(`${uid}_${data.productID}`).set(data, {merge: true});
    })
    .then(() => {
      // Show Snackbar
      const message = `The ${data.productName} was added succesfully`;
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

  updateGuideline(id, data) {
    this.guidelineDoc = this.afs.doc<Guideline>(`guidelines/${id}`);
    this.guidelineDoc.update(data);
    // this.specialistGuideDoc = this.afs.doc<Guideline>(`specialists/${this.specialistID}/guidelines/${id}`);
    // this.specialistGuideDoc.update(data);
  }

  deleteGuideline(id) {
    this.guidelineDoc = this.afs.doc(`guidelines/${id}`);
    this.guidelineDoc.delete();
  }
}
