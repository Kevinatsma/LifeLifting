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
  targetForm: FormGroup;
  targets = [
    {
      value: 'gain',
      viewValue: 'Gain weight'
    },
    {
      value: 'lose',
      viewValue: 'Lose weight'
    },
  ]; selectedTarget: string;

  mealTimes: [
    {time: string}
  ];
  mondayMeals: FormArray;
  tuesdayMeals: FormArray;
  wednesdayMeals: FormArray;
  thursdayMeals: FormArray;
  fridayMeals: FormArray;

  calcForm: FormGroup;
  calculatedPerc: number;
  increase: boolean;
  basalValues = [
    {
      value: 'increase',
      viewValue: 'Increase calories'
    },
    {
      value: 'decrease',
      viewValue: 'Decrease calories'
    },
  ]; selectedBasalValue: string;

  mealTimeForm: FormGroup;
  mealTimeArr: FormArray;
  showAddMealTime = true;

  mondayForm: FormGroup;
  tuesdayForm: FormGroup;
  wednesdayForm: FormGroup;
  thursdayForm: FormGroup;
  fridayForm: FormGroup;

  suppForm: FormGroup;
  macroForm: FormGroup;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private exerciseService: ExerciseService,
               private mealplanService: MealplanService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.exerciseService.getExercises().subscribe(exercises => this.exercises = exercises);
               }

  ngOnInit() {
    this.infoForm = this.fb.group({
      mealplanID: ['', [Validators.required]],
      mealplanName: ['', [Validators.required]],
    });

    this.mealTimeForm = this.fb.group({
      mealTimeArr: this.fb.array([ this.createMealTime(), this.createMealTime(), this.createMealTime() ]),
    });

    this.mondayForm = this.fb.group({
      mealTimeValue: [''],
      mealTimeOne: [''],
      mealTimeTwo: [''],
      mealTimeThree: [''],
      mealTimeFour: [''],
      mealTimeFive: [''],
      mealTimeSix: [''],
      mealTimeSeven: [''],
    });

    this.tuesdayForm = this.fb.group({
      mealTimeOne: [''],
      mealTimeTwo: [''],
      mealTimeThree: [''],
      mealTimeFour: [''],
      mealTimeFive: [''],
      mealTimeSix: [''],
      mealTimeSeven: [''],
    });

    this.wednesdayForm = this.fb.group({
      mealTimeOne: [''],
      mealTimeTwo: [''],
      mealTimeThree: [''],
      mealTimeFour: [''],
      mealTimeFive: [''],
      mealTimeSix: [''],
      mealTimeSeven: [''],
    });

    this.thursdayForm = this.fb.group({
      mealTimeOne: [''],
      mealTimeTwo: [''],
      mealTimeThree: [''],
      mealTimeFour: [''],
      mealTimeFive: [''],
      mealTimeSix: [''],
      mealTimeSeven: [''],
    });

    this.fridayForm = this.fb.group({
      mealTimeOne: [''],
      mealTimeTwo: [''],
      mealTimeThree: [''],
      mealTimeFour: [''],
      mealTimeFive: [''],
      mealTimeSix: [''],
      mealTimeSeven: [''],
    });

    this.suppForm = this.fb.group({
      before: ['', [Validators.required]],
      during: ['', [Validators.required]],
      after: ['', [Validators.required]],
    });

    this.macroForm = this.fb.group({
      proteinValue: ['', [Validators.required]],
      carbValue: ['', [Validators.required]],
      fatValue: ['', [Validators.required]],
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });

    // this.userService.getUserDataByID(this.mealplan.clientID).subscribe(user => this.client = user);
  }

  calculateCalories() {
    const factor = this.calcForm.get('factorCalorie').value;
    this.calculatedPerc = (factor * 100 - 100);
    if (this.calculatedPerc >= 1) {
      this.increase = true;
    } else {
      this.increase =  false;
    }
  }

  // MealTime form
  get mealTimeForms() {
    return this.mealTimeForm.get('mealTimeArr') as FormArray;
  }

  createMealTime(): FormGroup {
    return this.fb.group({
      mealTimeID: '',
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
