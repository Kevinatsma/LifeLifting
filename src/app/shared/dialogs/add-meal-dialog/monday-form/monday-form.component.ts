import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MealplanService } from '../../../../mealplans/mealplan.service';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../../user/user.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserService } from '../../../../user/user.service';
import { Exercise } from '../../../../exercises/exercise.model';
import { Food } from '../../../../foods/food.model';
import { FoodService } from '../../../../foods/food.service';
import { AddMealDialogService } from '../add-meal-dialog.service';
import { Time } from './../../../../shared/data/models/time.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monday-form',
  templateUrl: 'monday-form.component.html',
  styleUrls: ['./../add-meal-dialog.component.scss']
})
export class MondayFormComponent implements OnInit, OnDestroy {
  @Input() foods: Array<Food>;
  @Input() mealTimes;
  @Output() mealFormChange = new EventEmitter();
  user = User;
  specialistID;
  specialistID$: Subscription;
  hide = true;
  exercises: Exercise[];
  foods$: Subscription;

  ///////////////
  // FormGroups
  mondayMealForm: FormGroup;

  // Mealtime 1
  mOneMealOneForm: FormGroup;
  mOneMealOneArr: FormArray;
  mOneMealTwoForm: FormGroup;
  mOneMealTwoShow = false;
  mOneMealTwoArr: FormArray;

  // Mealtime 2
  mTwoMealOneForm: FormGroup;
  mTwoMealOneArr: FormArray;
  mTwoMealTwoForm: FormGroup;
  mTwoMealTwoShow = false;
  mTwoMealTwoArr: FormArray;

  // Mealtime 3
  mThreeMealOneForm: FormGroup;
  mThreeMealOneArr: FormArray;
  mThreeMealTwoForm: FormGroup;
  mThreeMealTwoShow = false;
  mThreeMealTwoArr: FormArray;

  // Mealtime 4
  mFourMealOneForm: FormGroup;
  mFourMealOneArr: FormArray;
  mFourMealTwoForm: FormGroup;
  mFourMealTwoArr: FormArray;
  mFourMealTwoShow = false;

  // Mealtime 5
  mFiveMealOneForm: FormGroup;
  mFiveMealOneArr: FormArray;
  mFiveMealTwoForm: FormGroup;
  mFiveMealTwoArr: FormArray;
  mFiveMealTwoShow = false;

  // Mealtime 6
  mSixMealOneForm: FormGroup;
  mSixMealOneArr: FormArray;
  mSixMealTwoForm: FormGroup;
  mSixMealTwoArr: FormArray;
  mSixMealTwoShow = false;

  // Mealtime 7
  mSevenMealOneForm: FormGroup;
  mSevenMealOneArr: FormArray;
  mSevenMealTwoForm: FormGroup;
  mSevenMealTwoArr: FormArray;
  mSevenMealTwoShow = false;

  selectedProduct: Food;
  showAddProduct = true;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private foodService: FoodService,
               private mealService: AddMealDialogService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.foods$ = this.foodService.getFoods().subscribe(foods => this.foods = foods);

                // Query elements
                const controlButtons = document.querySelectorAll('.dialog-button');
                const inputs = document.querySelectorAll('.f-input');

                // Set event listeners
                controlButtons.forEach(input => {
                   // Update the form object in the service
                  input.addEventListener('click', ((e) => {
                    const mondayMealForm = this.mondayMealForm.value;
                    return this.mealService.mondayFormChange.next(mondayMealForm);
                  }) as EventListener);
               });
              }

  ngOnInit() {
    this.mondayMealForm = this.fb.group({
      mOneMealOneTitle: ['', [Validators.required]],
      mOneMealOneArr: this.fb.array([ this.createProduct()]),
      mOneMealTwoTitle: [''],
      mOneMealTwoArr: this.fb.array([ this.createProduct()]),
      mTwoMealOneTitle: ['', [Validators.required]],
      mTwoMealOneArr: this.fb.array([ this.createProduct()]),
      mTwoMealTwoTitle: [''],
      mTwoMealTwoArr: this.fb.array([ this.createProduct()]),
      mThreeMealOneTitle: ['', [Validators.required]],
      mThreeMealOneArr: this.fb.array([ this.createProduct()]),
      mThreeMealTwoTitle: [''],
      mThreeMealTwoArr: this.fb.array([ this.createProduct()]),
      mFourMealOneTitle: ['', [Validators.required]],
      mFourMealOneArr: this.fb.array([ this.createProduct()]),
      mFourMealTwoTitle: [''],
      mFourMealTwoArr: this.fb.array([ this.createProduct()]),
      mFiveMealOneTitle: ['', [Validators.required]],
      mFiveMealOneArr: this.fb.array([ this.createProduct()]),
      mFiveMealTwoTitle: [''],
      mFiveMealTwoArr: this.fb.array([ this.createProduct()]),
      mSixMealOneTitle: ['', [Validators.required]],
      mSixMealOneArr: this.fb.array([ this.createProduct()]),
      mSixMealTwoTitle: [''],
      mSixMealTwoArr: this.fb.array([ this.createProduct()]),
      mSevenMealOneTitle: ['', [Validators.required]],
      mSevenMealOneArr: this.fb.array([ this.createProduct()]),
      mSevenMealTwoTitle: [''],
      mSevenMealTwoArr: this.fb.array([ this.createProduct()]),
    });

    this.specialistID$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });
  }

  ngOnDestroy() {
    this.specialistID$.unsubscribe();
    this.foods$.unsubscribe();
  }

  ///////////////////////////////////////////////////////////
  // Getters, get forms as array, to send to parent component
  ///////////////////////////////////////////////////////////
  get mOneMealOneForms() {
    return this.mondayMealForm.get('mOneMealOneArr') as FormArray;
  }
  get mOneMealTwoForms() {
    return this.mondayMealForm.get('mOneMealTwoArr') as FormArray;
  }
  get mTwoMealOneForms() {
    return this.mondayMealForm.get('mTwoMealOneArr') as FormArray;
  }
  get mTwoMealTwoForms() {
    return this.mondayMealForm.get('mTwoMealTwoArr') as FormArray;
  }
  get mThreeMealOneForms() {
    return this.mondayMealForm.get('mThreeMealOneArr') as FormArray;
  }
  get mThreeMealTwoForms() {
    return this.mondayMealForm.get('mThreeMealTwoArr') as FormArray;
  }
  get mFourMealOneForms() {
    return this.mondayMealForm.get('mFourMealOneArr') as FormArray;
  }
  get mFourMealTwoForms() {
    return this.mondayMealForm.get('mFourMealTwoArr') as FormArray;
  }
  get mFiveMealOneForms() {
    return this.mondayMealForm.get('mFiveMealOneArr') as FormArray;
  }
  get mFiveMealTwoForms() {
    return this.mondayMealForm.get('mFiveMealTwoArr') as FormArray;
  }
  get mSixMealOneForms() {
    return this.mondayMealForm.get('mSixMealOneArr') as FormArray;
  }
  get mSixMealTwoForms() {
    return this.mondayMealForm.get('mSixMealTwoArr') as FormArray;
  }
  get mSevenMealOneForms() {
    return this.mondayMealForm.get('mSevenMealOneArr') as FormArray;
  }
  get mSevenMealTwoForms() {
    return this.mondayMealForm.get('mSevenMealTwoArr') as FormArray;
  }


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
        array = this.mondayMealForm.get('mOneMealOneArr') as FormArray;
        break;
      case 12:
        array = this.mondayMealForm.get('mOneMealTwoArr') as FormArray;
        break;
      case 21:
        array = this.mondayMealForm.get('mTwoMealOneArr') as FormArray;
        break;
      case 22:
      array = this.mondayMealForm.get('mTwoMealTwoArr') as FormArray;
        break;
      case 31:
      array = this.mondayMealForm.get('mThreeMealOneArr') as FormArray;
        break;
      case 32:
      array = this.mondayMealForm.get('mThreeMealTwoArr') as FormArray;
        break;
      case 41:
      array = this.mondayMealForm.get('mFourMealOneArr') as FormArray;
        break;
      case 42:
      array = this.mondayMealForm.get('mFourMealTwoArr') as FormArray;
        break;
      case 51:
      array = this.mondayMealForm.get('mFiveMealOneArr') as FormArray;
        break;
      case 52:
      array = this.mondayMealForm.get('mFiveMealTwoArr') as FormArray;
        break;
      case 61:
      array = this.mondayMealForm.get('mSixMealOneArr') as FormArray;
        break;
      case 62:
      array = this.mondayMealForm.get('mSixMealTwoArr') as FormArray;
        break;
      case 71:
      array = this.mondayMealForm.get('mSevenMealOneArr') as FormArray;
        break;
      case 72:
      array = this.mondayMealForm.get('mSevenMealTwoArr') as FormArray;
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
        array = this.mondayMealForm.get('mOneMealOneArr') as FormArray;
        break;
      case 12:
        array = this.mondayMealForm.get('mOneMealTwoArr') as FormArray;
        break;
      case 21:
        array = this.mondayMealForm.get('mTwoMealOneArr') as FormArray;
        break;
      case 22:
      array = this.mondayMealForm.get('mTwoMealTwoArr') as FormArray;
        break;
      case 31:
      array = this.mondayMealForm.get('mThreeMealOneArr') as FormArray;
        break;
      case 32:
      array = this.mondayMealForm.get('mThreeMealTwoArr') as FormArray;
        break;
      case 41:
        array = this.mondayMealForm.get('mFourMealOneArr') as FormArray;
        break;
      case 42:
        array = this.mondayMealForm.get('mFourMealTwoArr') as FormArray;
        break;
      case 51:
        array = this.mondayMealForm.get('mFiveMealOneArr') as FormArray;
        break;
      case 52:
      array = this.mondayMealForm.get('mFiveMealTwoArr') as FormArray;
        break;
      case 61:
      array = this.mondayMealForm.get('mSixMealOneArr') as FormArray;
        break;
      case 62:
      array = this.mondayMealForm.get('mSixMealTwoArr') as FormArray;
        break;
      case 71:
      array = this.mondayMealForm.get('mSevenMealOneArr') as FormArray;
        break;
      case 72:
      array = this.mondayMealForm.get('mSevenMealTwoArr') as FormArray;
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
}
