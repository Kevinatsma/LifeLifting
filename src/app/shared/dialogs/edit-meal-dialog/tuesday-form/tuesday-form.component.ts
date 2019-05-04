import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
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
import { EditMealDialogService } from '../edit-meal-dialog.service';
import { Time } from '../../../data/models/time.model';

@Component({
  selector: 'app-edit-tuesday-form',
  templateUrl: 'tuesday-form.component.html',
  styleUrls: ['./../edit-meal-dialog.component.scss']
})
export class TuesdayFormComponent implements OnInit {
  @Input() foods: Array<Food>;
  @Input() mealTimes;
  @Output() mealFormChange = new EventEmitter();
  user = User;
  specialistID;
  hide = true;
  exercises: Exercise[];

  ///////////////
  // FormGroups
  tuesdayMealForm: FormGroup;

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
  mFourMealTwoShow = false;
  mFourMealTwoArr: FormArray;

  // Mealtime 5
  mFiveMealOneForm: FormGroup;
  mFiveMealOneArr: FormArray;
  mFiveMealTwoForm: FormGroup;
  mFiveMealTwoShow = false;
  mFiveMealTwoArr: FormArray;

  // Mealtime 6
  mSixMealOneForm: FormGroup;
  mSixMealOneArr: FormArray;
  mSixMealTwoForm: FormGroup;
  mSixMealTwoShow = false;
  mSixMealTwoArr: FormArray;

  // Mealtime 7
  mSevenMealOneForm: FormGroup;
  mSevenMealOneArr: FormArray;
  mSevenMealTwoForm: FormGroup;
  mSevenMealTwoShow = false;
  mSevenMealTwoArr: FormArray;

  selectedProduct: Food;
  showAddProduct = true;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private foodService: FoodService,
               private mealService: EditMealDialogService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.foodService.getFoods().subscribe(foods => this.foods = foods);

                // Query elements
                const controlButtons = document.querySelectorAll('.dialog-button');
                const inputs = document.querySelectorAll('.f-input');

                // Set event listeners
                controlButtons.forEach(input => {
                   // Update the form object in the service
                  input.addEventListener('click', ((e) => {
                    const tuesdayMealForm = this.tuesdayMealForm.value;
                    return this.mealService.tuesdayFormChange.next(tuesdayMealForm);
                  }) as EventListener);
               });
              }

  ngOnInit() {
    this.tuesdayMealForm = this.fb.group({
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

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });
    // this.userService.getUserDataByID(this.tuesdayMealplan.clientID).subscribe(user => this.client = user);
  }

  ///////////////////////////////////////////////////////////
  // Getters, get forms as array, to send to parent component
  ///////////////////////////////////////////////////////////
  get mOneMealOneForms() {
    return this.tuesdayMealForm.get('mOneMealOneArr') as FormArray;
  }
  get mOneMealTwoForms() {
    return this.tuesdayMealForm.get('mOneMealTwoArr') as FormArray;
  }
  get mTwoMealOneForms() {
    return this.tuesdayMealForm.get('mTwoMealOneArr') as FormArray;
  }
  get mTwoMealTwoForms() {
    return this.tuesdayMealForm.get('mTwoMealTwoArr') as FormArray;
  }
  get mThreeMealOneForms() {
    return this.tuesdayMealForm.get('mThreeMealOneArr') as FormArray;
  }
  get mThreeMealTwoForms() {
    return this.tuesdayMealForm.get('mThreeMealTwoArr') as FormArray;
  }
  get mFourMealOneForms() {
    return this.tuesdayMealForm.get('mFourMealOneArr') as FormArray;
  }
  get mFourMealTwoForms() {
    return this.tuesdayMealForm.get('mFourMealTwoArr') as FormArray;
  }
  get mFiveMealOneForms() {
    return this.tuesdayMealForm.get('mFiveMealOneArr') as FormArray;
  }
  get mFiveMealTwoForms() {
    return this.tuesdayMealForm.get('mFiveMealTwoArr') as FormArray;
  }
  get mSixMealOneForms() {
    return this.tuesdayMealForm.get('mSixMealOneArr') as FormArray;
  }
  get mSixMealTwoForms() {
    return this.tuesdayMealForm.get('mSixMealTwoArr') as FormArray;
  }
  get mSevenMealOneForms() {
    return this.tuesdayMealForm.get('mSevenMealOneArr') as FormArray;
  }
  get mSevenMealTwoForms() {
    return this.tuesdayMealForm.get('mSevenMealTwoArr') as FormArray;
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
        array = this.tuesdayMealForm.get('mOneMealOneArr') as FormArray;
        break;
      case 12:
        array = this.tuesdayMealForm.get('mOneMealTwoArr') as FormArray;
        break;
      case 21:
        array = this.tuesdayMealForm.get('mTwoMealOneArr') as FormArray;
        break;
      case 22:
      array = this.tuesdayMealForm.get('mTwoMealTwoArr') as FormArray;
        break;
      case 31:
      array = this.tuesdayMealForm.get('mThreeMealOneArr') as FormArray;
        break;
      case 32:
      array = this.tuesdayMealForm.get('mThreeMealTwoArr') as FormArray;
        break;
      case 41:
      array = this.tuesdayMealForm.get('mFourMealOneArr') as FormArray;
        break;
      case 42:
      array = this.tuesdayMealForm.get('mFourMealTwoArr') as FormArray;
        break;
      case 51:
      array = this.tuesdayMealForm.get('mFiveMealOneArr') as FormArray;
        break;
      case 52:
      array = this.tuesdayMealForm.get('mFiveMealTwoArr') as FormArray;
        break;
      case 61:
      array = this.tuesdayMealForm.get('mSixMealOneArr') as FormArray;
        break;
      case 62:
      array = this.tuesdayMealForm.get('mSixMealTwoArr') as FormArray;
        break;
      case 71:
      array = this.tuesdayMealForm.get('mSevenMealOneArr') as FormArray;
        break;
      case 72:
      array = this.tuesdayMealForm.get('mSevenMealTwoArr') as FormArray;
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
        array = this.tuesdayMealForm.get('mOneMealOneArr') as FormArray;
        break;
      case 12:
        array = this.tuesdayMealForm.get('mOneMealTwoArr') as FormArray;
        break;
      case 21:
        array = this.tuesdayMealForm.get('mTwoMealOneArr') as FormArray;
        break;
      case 22:
      array = this.tuesdayMealForm.get('mTwoMealTwoArr') as FormArray;
        break;
      case 31:
      array = this.tuesdayMealForm.get('mThreeMealOneArr') as FormArray;
        break;
      case 32:
      array = this.tuesdayMealForm.get('mThreeMealTwoArr') as FormArray;
        break;
      case 41:
        array = this.tuesdayMealForm.get('mFourMealOneArr') as FormArray;
        break;
      case 42:
        array = this.tuesdayMealForm.get('mFourMealTwoArr') as FormArray;
        break;
      case 51:
        array = this.tuesdayMealForm.get('mFiveMealOneArr') as FormArray;
        break;
      case 52:
      array = this.tuesdayMealForm.get('mFiveMealTwoArr') as FormArray;
        break;
      case 61:
      array = this.tuesdayMealForm.get('mSixMealOneArr') as FormArray;
        break;
      case 62:
      array = this.tuesdayMealForm.get('mSixMealTwoArr') as FormArray;
        break;
      case 71:
      array = this.tuesdayMealForm.get('mSevenMealOneArr') as FormArray;
        break;
      case 72:
      array = this.tuesdayMealForm.get('mSevenMealTwoArr') as FormArray;
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
