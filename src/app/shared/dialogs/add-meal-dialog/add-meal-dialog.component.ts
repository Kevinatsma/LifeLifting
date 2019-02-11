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
import { DayForm } from './day-form.model';

@Component({
  selector: 'app-add-meal-dialog',
  templateUrl: './add-meal-dialog.component.html',
  styleUrls: ['./add-meal-dialog.component.scss']
})
export class AddMealDialogComponent implements OnInit {
  // Values for storing data
  user = User;
  specialistID;

  // FormGroups
  infoForm: FormGroup;
  // MealTimes get shared with child forms
  mealTimeForm: FormGroup;
  mealTimeArr: FormArray;
  mondayForm: FormGroup;
  tuesdayForm: FormGroup;
  wednesdayForm: FormGroup;
  thursdayForm: FormGroup;
  fridayForm: FormGroup;
  suppForm: FormGroup;

  // Day forms, these get changed by events emitted from the child components
  mondayMeals: Observable<DayForm>;
  tuesdayMeals: Observable<DayForm>;
  wednesdayMeals: Observable<DayForm>;
  thursdayMeals: Observable<DayForm>;
  fridayMeals: Observable<DayForm>;

  // Select value loops - retreive from json/firestore
  mealTimeNames = [
    {value: 'Breakfast'},
    {value: 'Morning snack'},
    {value: 'Lunch'},
    {value: 'Afternoon snack'},
    {value: 'Pre-workout meal'},
    {value: 'Dinner'},
    {value: 'Post-workout meal'},
    {value: 'Late-night snack'}
  ];
  times: Time[] = times.times;
  foods: Food[];

  // Hide/show booleans
  showAddMealTime = true;

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
    this.mealService.mondayFormChange.subscribe(obj => this.mondayMeals = obj);
  }

  // MealTime form
  get mealTimeForms() {
    return this.mealTimeForm.get('mealTimeArr') as FormArray;
  }

  createMealTime(): FormGroup {
    return this.fb.group({
      mealTime: '',
      mealTimeName: '',
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

  // Subscribe to mealService formgroups so we can receive changes made in child forms

  // get mondayForm(): any {
  //   return this.mealService.mondayMealForm;
  // }
  checkMondayForm() {
    console.log(this.mondayMeals);
  }


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
      mealTimes: this.mealTimeForm.value,
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
