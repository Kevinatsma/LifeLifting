import { Injectable } from '@angular/core';
import { Food } from 'src/app/foods/food.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { DayForm } from './day-form.model';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddMealDialogService {
  mondayFormChange: Subject<any> = new Subject<any>();
  mondayMealForm: DayForm;
  mealTimeChange: Subject<any> = new Subject<any>();
  mealTimes: FormArray;

  constructor() {
    this.mondayFormChange.subscribe((mondayForm) => {
      this.mondayMealForm = mondayForm;
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
}
