import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { Mealplan } from './mealplan.model';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Specialist } from '../specialists/specialist.model';
import { UserService } from '../user/user.service';
import { AuthService } from '../core/auth/auth.service';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class MealplanService implements OnDestroy {
  specialistID: string;
  user: User;
  user$: Subscription;
  mealplanCol: AngularFirestoreCollection<Mealplan>;
  mealplans: Observable<Mealplan[]>;
  mealplanDoc: AngularFirestoreDocument<Mealplan>;
  mealplan: Observable<Mealplan>;

  clientGuideCol: AngularFirestoreCollection<Mealplan>;
  clientMealplans: Observable<Mealplan[]>;
  clientGuideDoc: AngularFirestoreDocument<Mealplan>;
  clientGuide: Observable<Mealplan>;

  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();
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
    this.mealplanCol = this.afs.collection<Mealplan>(`mealplans`);
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  getMealplanDataById(id) {
    this.mealplanDoc = this.afs.doc<Mealplan>(`mealplans/${id}`);
    this.mealplan = this.mealplanDoc.valueChanges();
    return this.mealplan;
  }

  getMealplans() {
    this.mealplanCol = this.afs.collection('mealplans', ref => ref
      .orderBy('creationDate', 'desc'));
    this.mealplans = this.clientGuideCol.valueChanges();
    return this.mealplans;
  }

  queryMealplans(colRef) {
    this.mealplans = colRef.valueChanges();
    return this.mealplans;
  }

  addMealplan(data) {
    this.afs.collection<Mealplan>(`mealplans`).add(data)
    .then(credential => {
      const idData = {
        mID: credential.id
      };
      this.updateMealplan(credential.id, idData);
    })
    .then(() => {
      // Show Snackbar
      const message = `${data.mealplanName} was added succesfully`;
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 10000,
        panelClass: ['success-snackbar']
      });
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }


  duplicateMealplan(data) {
    this.afs.collection<Mealplan>(`mealplans`).add(data)
    .then((credential) => {
      // Update guideline
      const idData = {
        mID: credential.id,
        creationDate: new Date(),
        lastEdited: null
      };
      this.updateMealplan(credential.id, idData);
    })
    .then(() => {
      // Show Snackbar
      const message = `${data.mealplanName} was duplicated succesfully`;
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

  updateMealplan(id, data) {
    this.mealplanDoc = this.afs.doc<Mealplan>(`mealplans/${id}`);
    this.mealplanDoc.update(data);
  }

  deleteMealplan(id) {
    this.mealplanDoc = this.afs.doc(`mealplans/${id}`);
    this.mealplanDoc.delete();
  }
}
