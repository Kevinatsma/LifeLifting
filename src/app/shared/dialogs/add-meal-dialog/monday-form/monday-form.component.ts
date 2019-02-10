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
  mondayMealArr: FormArray;
  selectedProduct: Food;


  showAddMeal = true;

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
      mealTimeOne: [''],
      mealTimeTwo: [''],
      mealTimeThree: [''],
      mealTimeFour: [''],
      mealTimeFive: [''],
      mealTimeSix: [''],
      mealTimeSeven: [''],
      mealTitle: ['', [Validators.required]],
      mealArr: this.fb.array([ this.createMeal()])
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
  get mondayMealForms() {
    return this.mondayMealForm.get('mondayMealArr') as FormArray;
  }

  createMeal(): FormGroup {
    return this.fb.group({
      mondayMealTitle: '',
    });
  }

  addMeal(): void {
    this.mondayMealArr = this.mondayMealForm.get('mondayMealArr') as FormArray;
    this.mondayMealArr.push(this.createMeal());
  }

  checkMeal(): void {
    if (this.mondayMealArr.length < 2) {
      this.showAddMeal = true;
    } else {
      this.showAddMeal = false;
    }
  }

  deleteMeal(i) {
    (this.mondayMealForm.get('mondayMealArr') as FormArray).removeAt(i);
  }
}
