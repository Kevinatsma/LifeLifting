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

  // FormGroups
  mondayMealForm: FormGroup;
  mOneMealOneForm: FormGroup;
  mOneMealOneArr: FormArray;
  mOneMealTwoForm: FormGroup;
  mOneMealTwoShow = false;
  mOneMealTwoArr: FormArray;
  selectedProduct: Food;


  showAddProduct = true;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private foodService: FoodService,
               private mondayMealDialogService: AddMealDialogService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.foodService.getFoods().subscribe(foods => this.foods = foods);

                // Query elements
                const inputs = document.querySelectorAll('.f-input');

                // Set event listeners
                inputs.forEach(input => {
                  input.addEventListener('input', this.updateMondayForm());
                });
               }

  ngOnInit() {
    this.mondayMealForm = this.fb.group({
      mOneMealOneTitle: ['', [Validators.required]],
      mOneMealOneArr: this.fb.array([ this.createProduct()]),
      mOneMealTwoTitle: [''],
      mOneMealTwoArr: this.fb.array([ this.createProduct()]),
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });
    // this.userService.getUserDataByID(this.mondayMealplan.clientID).subscribe(user => this.client = user);
  }

  // Update the form object in the service
  updateMondayForm() {
    const mondayMealForm = this.mondayMealForm.value;
    console.log(mondayMealForm);
    return this.mondayMealDialogService.mondayMealForm = mondayMealForm;
  }

  // Meal form
  get mOneMealOneForms() {
    return this.mondayMealForm.get('mOneMealOneArr') as FormArray;
  }
  get mOneMealTwoForms() {
    return this.mondayMealForm.get('mOneMealTwoArr') as FormArray;
  }

  // Product array item
  createProduct(): FormGroup {
    return this.fb.group({
      productTitle: '',
    });
  }

  addProduct(number): void {
    let array;
    if (number === 11) {
      array = this.mondayMealForm.get('mOneMealOneArr') as FormArray;
    } else if (number ===  12 ) {
      array = this.mondayMealForm.get('mOneMealTwoArr') as FormArray;
    }
    this.checkProduct(array);
    return array.push(this.createProduct());
  }

  deleteProduct(number, i) {
    let array;
    if (number === 11) {
      array = this.mondayMealForm.get('mOneMealOneArr') as FormArray;
    } else if (number ===  12 ) {
      array = this.mondayMealForm.get('mOneMealTwoArr') as FormArray;
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
