import { Injectable } from '@angular/core';
import { Food } from './../../../foods/food.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { DayForm } from './day-form.model';
import { FormArray } from '@angular/forms';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AddMealDialogService {
  mondayFormChange: Subject<any> = new Subject<any>();
  mondayMealForm: DayForm;
  tuesdayFormChange: Subject<any> = new Subject<any>();
  tuesdayMealForm: DayForm;
  wednesdayFormChange: Subject<any> = new Subject<any>();
  wednesdayMealForm: DayForm;
  thursdayFormChange: Subject<any> = new Subject<any>();
  thursdayMealForm: DayForm;
  fridayFormChange: Subject<any> = new Subject<any>();
  fridayMealForm: DayForm;
  mealTimeChange: Subject<any> = new Subject<any>();
  mealTimes: FormArray;

  constructor( private afs: AngularFirestore,
               private snackBar: MatSnackBar) {
    this.mondayFormChange.subscribe((mondayForm) => {
      this.mondayMealForm = mondayForm;
    });
    this.tuesdayFormChange.subscribe((tuesdayForm) => {
      this.tuesdayMealForm = tuesdayForm;
    });
    this.wednesdayFormChange.subscribe((wednesdayForm) => {
      this.wednesdayMealForm = wednesdayForm;
    });
    this.thursdayFormChange.subscribe((thursdayForm) => {
      this.thursdayMealForm = thursdayForm;
    });
    this.fridayFormChange.subscribe((fridayForm) => {
      this.fridayMealForm = fridayForm;
    });
    this.mealTimeChange.subscribe((mealTimes) => {
      this.mealTimes = mealTimes;
    });
   }

  updateMealTimes(mealTimes) {
    this.mealTimeChange.next(mealTimes);
  }

  updateMondayForm(mondayMealForm) {
    this.mondayFormChange.next(mondayMealForm);
  }

  updateTuesdayForm(tuesdayMealForm) {
    this.tuesdayFormChange.next(tuesdayMealForm);
  }

  updateWednesdayForm(wednesdayMealForm) {
    this.wednesdayFormChange.next(wednesdayMealForm);
  }

  updateThursdayForm(thursMealForm) {
    this.thursdayFormChange.next(thursMealForm);
  }

  updateFridayForm(fridayMealForm) {
    this.fridayFormChange.next(fridayMealForm);
  }

  addMealplan(data) {
    this.afs.collection<Mealplan>(`mealplans`).doc(`${data.mealplanID}`).set(data, {merge: true})
    .then(() => {
      // Show Snackbar
      const message = `The ${data.mealplanName} was added succesfully`;
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
}
