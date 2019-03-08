import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

// Services
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../user/user.service';
import { ExerciseService } from '../../../exercises/exercise.service';
import { FoodService } from './../../../foods/food.service';
import { MealplanService } from '../../../mealplans/mealplan.service';
import { AddMealDialogService } from './add-meal-dialog.service';
import { GuidelineService } from './../../../guidelines/guideline.service';
import { Observable } from 'rxjs';

// Data
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../user/user.model';
import { Guideline } from './../../../guidelines/guideline.model';
import { Exercise } from '../../../exercises/exercise.model';
import { Time } from '../../data/models/time.model';
import { Food } from './../../../foods/food.model';
import { DayForm } from './day-form.model';
import times from './../../data/JSON/times.json';
import mealTimes from './../../data/JSON/mealTimes.json';

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
  suppForm: FormGroup;

  // Day forms, these get changed by events emitted from the child components
  mondayMeals: Observable<DayForm>;
  tuesdayMeals: Observable<DayForm>;
  wednesdayMeals: Observable<DayForm>;
  thursdayMeals: Observable<DayForm>;
  fridayMeals: Observable<DayForm>;

  // Select value loops - retreive from json/firestore
  mealTimeNames = mealTimes.mealTimes;
  times: Time[] = times.times;
  foods: Food[];
  selectedProduct: Food;

  // Hide/show booleans
  showAddMealTime = true;
  showAddProduct = true;

  // Guidelines and Exercises
  guideline: Guideline;
  guidelines: Guideline[];
  guideExercises: Object;
  exercises: any;
  exerciseOne: Exercise;
  exerciseTwo: Exercise;
  exerciseThree: Exercise;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private foodService: FoodService,
               private exerciseService: ExerciseService,
               private mealplanService: MealplanService,
               public guidelineService: GuidelineService,
               public mealService: AddMealDialogService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.foodService.getFoods().subscribe(foods => this.foods = foods);
                this.guidelineService.getGuidelinesByClient(userData.uid).subscribe(guidelines => this.guidelines = guidelines);
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
      guideline: ['', [Validators.required]],
      beforeTrainOneArr: this.fb.array([ this.createProduct()]),
      duringTrainOneArr: this.fb.array([ this.createProduct()]),
      afterTrainOneArr: this.fb.array([ this.createProduct()]),
      beforeTrainTwoArr: this.fb.array([ this.createProduct()]),
      duringTrainTwoArr: this.fb.array([ this.createProduct()]),
      afterTrainTwoArr: this.fb.array([ this.createProduct()]),
      beforeThree: [''],
      duringThree: [''],
      afterThree: [''],
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });
    // this.userService.getUserDataByID(this.mealplan.clientID).subscribe(user => this.client = user);

    // Subscribe to Form day Objects
    this.mealService.mondayFormChange.subscribe(obj => this.mondayMeals = obj);
    this.mealService.tuesdayFormChange.subscribe(obj => this.tuesdayMeals = obj);
    this.mealService.wednesdayFormChange.subscribe(obj => this.wednesdayMeals = obj);
    this.mealService.thursdayFormChange.subscribe(obj => this.thursdayMeals = obj);
    this.mealService.fridayFormChange.subscribe(obj => this.fridayMeals = obj);
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

  // Guidelines

  guidelineHandler() {
    const id = this.suppForm.get('guideline').value;
    console.log(id);
    this.guidelineService.getGuidelineDataById(id)
      .subscribe(guideline => {
        this.guideline = guideline;
        this.getExercises(guideline);
      });
  }

  // Supp form


  // Getters
  getExercises(guideline) {
    this.exerciseService.getMultipleExercises(guideline);
    this.exerciseService.guideExercises.eOne.subscribe(exercise => {
      this.exerciseOne = exercise;
    });
    if (this.exerciseService.guideExercises.eTwo) {
      this.exerciseService.guideExercises.eTwo.subscribe(exercise => {
        this.exerciseTwo = exercise;
      });
    } else if (this.exerciseService.guideExercises.eThree) {
      this.exerciseService.guideExercises.eThree.subscribe(exercise => {
        this.exerciseTwo = exercise;
      });
    }
    this.exercises = [
      this.exerciseOne,
      this.exerciseTwo,
      this.exerciseThree
    ];
  }

  get beforeOneForms() {
    return this.suppForm.get('beforeTrainOneArr') as FormArray;
  }

  get duringOneForms() {
    return this.suppForm.get('duringTrainOneArr') as FormArray;
  }

  get afterOneForms() {
    return this.suppForm.get('afterTrainOneArr') as FormArray;
  }

  get beforeTwoForms() {
    return this.suppForm.get('beforeTrainTwoArr') as FormArray;
  }

  get duringTwoForms() {
    return this.suppForm.get('duringTrainTwoArr') as FormArray;
  }

  get afterTwoForms() {
    return this.suppForm.get('afterTrainTwoArr') as FormArray;
  }

  get beforeThreeForms() {
    return this.suppForm.get('beforeTrainThreeArr') as FormArray;
  }

  get duringThreeForms() {
    return this.suppForm.get('duringTrainThreeArr') as FormArray;
  }

  get afterThreeForms() {
    return this.suppForm.get('afterTrainThreeArr') as FormArray;
  }

  // Supp form


  //////////////////////////////////////////////////////////////
  // Creating, adding, deleting and checking product Formarrays
  //////////////////////////////////////////////////////////////

  createProduct(): FormGroup {
    return this.fb.group({
      product: '',
      amount: '',
      prep: '',
    });
  }

  addProduct(number): void {
    let array;

    // Conditionals for all 7 possible mealtimes and thus 14 possible meals
    switch (number) {
      case 11:
        array = this.suppForm.get('beforeTrainOneArr') as FormArray;
        break;
      case 12:
        array = this.suppForm.get('duringTrainOneArr') as FormArray;
        break;
      case 13:
        array = this.suppForm.get('afterTrainOneArr') as FormArray;
        break;
      case 21:
        array = this.suppForm.get('beforeTrainTwoArr') as FormArray;
        break;
      case 22:
        array = this.suppForm.get('duringTrainTwoArr') as FormArray;
        break;
      case 23:
        array = this.suppForm.get('afterTrainTwoArr') as FormArray;
        break;
      case 31:
        array = this.suppForm.get('beforeTrainThreeArr') as FormArray;
        break;
      case 32:
        array = this.suppForm.get('duringTrainThreeArr') as FormArray;
        break;
      case 33:
        array = this.suppForm.get('afterTrainThreeArr') as FormArray;
        break;
      default:
        array = null;
    }
    this.checkProduct(array);
    return array.push(this.createProduct());
  }

  deleteProduct(number, i) {
    let array;
    switch (number) {
      case 11:
        array = this.suppForm.get('beforeTrainOneArr') as FormArray;
        break;
      case 12:
        array = this.suppForm.get('duringTrainOneArr') as FormArray;
        break;
      case 13:
        array = this.suppForm.get('afterTrainOneArr') as FormArray;
        break;
      case 21:
        array = this.suppForm.get('beforeTrainTwoArr') as FormArray;
        break;
      case 22:
        array = this.suppForm.get('duringTrainTwoArr') as FormArray;
        break;
      case 23:
        array = this.suppForm.get('afterTrainTwoArr') as FormArray;
        break;
      case 21:
        array = this.suppForm.get('beforeTrainThreeArr') as FormArray;
        break;
      case 22:
        array = this.suppForm.get('duringTrainThreeArr') as FormArray;
        break;
      case 23:
        array = this.suppForm.get('afterTrainThreeArr') as FormArray;
        break;
      default:
        array = null;
    }
    this.checkProduct(array);
    return array.removeAt(i);
  }

  checkProduct(array): void {
    if (array.length < 10) {
      this.showAddProduct = true;
    } else {
      this.showAddProduct = false;
    }
  }

  checkArray() {
    const array = this.suppForm.get('beforeTrainOneArr').value;
    console.log(array);
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
      guideline: this.suppForm.get('guideline').value,
      mealTimes: this.mealTimeForms.value,
      mondayMeals: this.mondayMeals,
      tuesdayMeals: this.tuesdayMeals,
      wednesdayMeals: this.wednesdayMeals,
      thursdayMeals: this.thursdayMeals,
      fridayMeals: this.fridayMeals,
      supplementation: {
        beforeOneArr: this.beforeOneForms.value || null,
        beforeTwoArr: this.beforeOneForms.value || null,
        beforeThreeArr: this.beforeOneForms.value || null,
      }
    };
    this.mealplanService.addMealplan(data);
  }
}
