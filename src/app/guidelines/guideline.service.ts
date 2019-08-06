import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { Guideline } from './guideline.model';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../user/user.service';
import { AuthService } from '../core/auth/auth.service';
import { User } from '../user/user.model';
import { Measurement } from '../measurement/measurement.model';
import { FirstConsultation } from '../first-consultation/first-consultation.model';

@Injectable({
  providedIn: 'root'
})
export class GuidelineService implements OnDestroy {
  specialistID: string;
  user: User;
  user$: Subscription;
  guidelineCol: AngularFirestoreCollection<Guideline>;
  guidelines: Observable<Guideline[]>;
  guidelineDoc: AngularFirestoreDocument<Guideline>;
  guideline: Observable<Guideline>;

  clientGuideCol: AngularFirestoreCollection<Guideline>;
  clientGuidelines: Observable<Guideline[]>;
  clientGuideDoc: AngularFirestoreDocument<Guideline>;
  clientGuide: Observable<Guideline>;

  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();
  measurements: Measurement[];
  measurementChange: Subject<Measurement[]> = new Subject<Measurement[]>();
  fics: FirstConsultation[];
  ficChange: Subject<FirstConsultation[]> = new Subject<FirstConsultation[]>();
  gainWeight: boolean;
  increaseCals: boolean;

  constructor( private afs: AngularFirestore,
               private auth: AuthService,
               public snackBar: MatSnackBar,
               private userService: UserService
             ) {
    this.user$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.user = user;
      this.specialistID = this.user.sID;
    });
    this.guidelineCol = this.afs.collection<Guideline>(`guidelines`);
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });
    this.measurementChange.subscribe((value) => {
      this.measurements = value;
    });
    this.ficChange.subscribe((value) => {
      this.fics = value;
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  updateMeasurements(measurements) {
    this.measurementChange.next(measurements);
  }
  updateFics(fics) {
    this.ficChange.next(fics);
  }

  getGuidelineDataById(id) {
    this.guidelineDoc = this.afs.doc<Guideline>(`guidelines/${id}`);
    this.guideline = this.guidelineDoc.valueChanges();
    return this.guideline;
  }

  getGuidelines() {
    this.guidelineCol = this.afs.collection('guidelines', ref => ref
      .orderBy('creationDate', 'desc'));
    this.guidelines = this.guidelineCol.valueChanges();
    return this.guidelines;
  }

  getGuidelinesByClient(uid) {
    this.clientGuideCol = this.afs.collection('guidelines', ref => ref
      .where('clientID', '==', `${uid}`));
    this.guidelines = this.clientGuideCol.valueChanges();
    return this.guidelines;
  }

  addGuideline(data) {
    this.afs.collection<Guideline>(`guidelines`).add(data)
    .then((credential) => {
      const idData = {
        gID: credential.id
      };
      this.updateGuideline(credential.id, idData);
    })
    .then(() => {
      // Show Snackbar
      const message = `${data.guidelineName} was added succesfully`;
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 5000,
        panelClass: ['success-snackbar']
      });
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }

  duplicateGuideline(data) {
    this.afs.collection<Guideline>(`guidelines`).add(data)
    .then((credential) => {
      // Update guideline
      const idData = {
        gID: credential.id,
        creationDate: new Date(),
        lastEdited: null
      };
      this.updateGuideline(credential.id, idData);
    })
    .then(() => {
      // Show Snackbar
      const message = `${data.guidelineName} was duplicated succesfully`;
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 5000,
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
  }

  deleteGuideline(id) {
    this.guidelineDoc = this.afs.doc(`guidelines/${id}`);
    this.guidelineDoc.delete();
  }
}
