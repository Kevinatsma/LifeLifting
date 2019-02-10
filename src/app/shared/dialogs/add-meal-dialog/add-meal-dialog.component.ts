import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MealplanService } from '../../../mealplans/mealplan.service';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../user/user.model';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../user/user.service';
import { Exercise } from '../../../exercises/exercise.model';
import { ExerciseService } from '../../../exercises/exercise.service';
import times from './../../data/JSON/times.json';
import { Time } from '../../data/models/time.model';
import { Food } from './../../../foods/food.model';
import { Observable } from 'rxjs';
import { FoodService } from './../../../foods/food.service';
import { MondayFormComponent } from './monday-form/monday-form.component';
import { AddMealDialogService } from './add-meal-dialog.service';

@Component({
  selector: 'app-add-meal-dialog',
  templateUrl: './add-meal-dialog.component.html',
  styleUrls: ['./add-meal-dialog.component.scss']
})
export class AddMealDialogComponent implements OnInit {
  user = User;
  specialistID;
  hide = true;
  exercises: Exercise[];

  // FormGroups
  addMealplanForm: FormGroup;
  infoForm: FormGroup;

  //
  mealTimes: [
    {value: string}
  ];

  // Day forms, these get changed by events emitted from the child components
  mondayMeals: FormArray;
  tuesdayMeals: FormArray;
  wednesdayMeals: FormArray;
  thursdayMeals: FormArray;
  fridayMeals: FormArray;

  // retreive times from  json file
  times: Time[] = times.times;

  // form to add meal times -->  they get send to the child components
  mealTimeForm: FormGroup;
  mealTimeArr: FormArray;
  showAddMealTime = true;

  foods: Food[];
  mondayForm: FormGroup;
  tuesdayForm: FormGroup;
  wednesdayForm: FormGroup;
  thursdayForm: FormGroup;
  fridayForm: FormGroup;

  suppForm: FormGroup;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private foodService: FoodService,
               private mealplanService: MealplanService,
               public mealService: AddMealDialogService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.foodService.getFoods().subscribe(foods => this.foods = foods);
               }

  ngOnInit() {
    this.infoForm = this.fb.group({
      mealplanID: ['', [Validators.required]],
      mealplanName: ['', [Validators.required]],
    });

    this.mealTimeForm = this.fb.group({
      mealTimeArr: this.fb.array([ this.createMealTime(), this.createMealTime(), this.createMealTime() ]),
    });

    this.suppForm = this.fb.group({
      before: ['', [Validators.required]],
      during: ['', [Validators.required]],
      after: ['', [Validators.required]],
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });
    // this.userService.getUserDataByID(this.mealplan.clientID).subscribe(user => this.client = user);

    // Subscribe to Form day Objects
  }

  // get mondayForm(): any {
  //   return this.mealService.mondayMealForm;
  // }

  // updateMondayForm() {
  //     this.mealService.updateMondayForm();
  // }

  // MealTime form
  get mealTimeForms() {
    return this.mealTimeForm.get('mealTimeArr') as FormArray;
  }

  createMealTime(): FormGroup {
    return this.fb.group({
      mealTime: '',
    });
  }

  addMealTime(): void {
    this.mealTimeArr = this.mealTimeForm.get('mealTimeArr') as FormArray;
    this.mealTimeArr.push(this.createMealTime());
  }

  checkMealTime(): void {
    if (this.mealTimeArr.length < 7) {
      this.showAddMealTime = true;
    } else {
      this.showAddMealTime = false;
    }
  }

  deleteMealTime(i) {
    (this.mealTimeForm.get('mealTimeArr') as FormArray).removeAt(i);
  }

  updateMealTimes() {
    this.mealTimeArr = this.mealTimeForm.get('mealTimeArr') as FormArray;
  }

  // Update formgroups

  // Collect the data and send to service
  addMealplan() {
    const mID: number =  this.infoForm.get('mealplanID').value;
    const data = {
      clientID: this.userData.uid,
      specialistID: this.specialistID,
      creationDate: new Date(),
      mealplanID: this.userData.uid + '_' + mID,
      mealplanNR: mID,
      mealplanName: this.infoForm.get('mealplanName').value,
      mealTimes: this.mealTimes,
      mondayMeals: this.mondayMeals,
      tuesdayMeals: this.tuesdayMeals,
      wednesdayMeals: this.wednesdayMeals,
      thursdayMeals: this.thursdayMeals,
      fridayMeals: this.fridayMeals,
      supplementation: {
        mealTimeID: this.mealTimeForm.get('mealTimeID').value,
        before: this.suppForm.get('before').value || null,
        during: this.suppForm.get('during').value || null,
        after: this.suppForm.get('after').value || null
      }
    };
    this.mealplanService.addMealplan(data);
  }
}
