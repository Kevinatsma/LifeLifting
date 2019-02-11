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
import { AddMealDialogService } from '../add-meal-dialog.service';
import { Time } from './../../../../shared/data/models/time.model';

@Component({
  selector: 'app-monday-form',
  templateUrl: 'monday-form.component.html',
  styleUrls: ['./../add-meal-dialog.component.scss']
})
export class MondayFormComponent implements OnInit {
  @Input() foods: Array<Food>;
  @Input() mealTimes;
  @Output() mealFormChange = new EventEmitter();
  user = User;
  specialistID;
  hide = true;
  exercises: Exercise[];

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

  // Mealtime 2
  mThreeMealOneForm: FormGroup;
  mThreeMealOneArr: FormArray;
  mThreeMealTwoForm: FormGroup;
  mThreeMealTwoShow = false;
  mThreeMealTwoArr: FormArray;

  selectedProduct: Food;


  showAddProduct = true;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private foodService: FoodService,
               private mealService: AddMealDialogService,
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
                    console.log('im fired');
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
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });
    // this.userService.getUserDataByID(this.mondayMealplan.clientID).subscribe(user => this.client = user);
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

  //////////////////////////////////////////////////////////////
  // Creating, adding, deleting and checking product Formarrays
  //////////////////////////////////////////////////////////////

  createProduct(): FormGroup {
    return this.fb.group({
      product: '',
      amount: '',
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
    const array = this.mondayMealForm.get('mOneMealOneArr').value;
    console.log(array);
  }
}
