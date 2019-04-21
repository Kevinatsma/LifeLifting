
import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../../user/user.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserService } from '../../../../user/user.service';
import { Exercise } from '../../../../exercises/exercise.model';
import { Food } from '../../../../foods/food.model';
import { FoodService } from '../../../../foods/food.service';
import { AddMealDialogService } from '../add-meal-dialog.service';
import { Guideline } from './../../../../guidelines/guideline.model';
import { GuidelineService } from './../../../../guidelines/guideline.service';
import { ExerciseService } from './../../../../exercises/exercise.service';

@Component({
  selector: 'app-supps-form',
  templateUrl: 'supps-form.component.html',
  styleUrls: ['./../add-meal-dialog.component.scss']
})
export class SuppsFormComponent implements OnInit {
  @Input() foods: Array<Food>;
  @Output() suppsFormChange = new EventEmitter();
  user = User;
  specialistID;
  hide = true;

  // Form
  suppsForm: FormGroup;

  // Show/hide booleans
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
               private mealService: AddMealDialogService,
               private exerciseService: ExerciseService,
               public guidelineService: GuidelineService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.foodService.getFoods().subscribe(foods => this.foods = foods);

                // Get guidelines
                this.guidelineService.getGuidelinesByClient(userData.uid).subscribe(guidelines => {
                  this.guidelines = guidelines;

                  if (this.guidelines.length < 1) {
                    this.guidelines = null;
                  }
                });

                // Query elements
                const controlButtons = document.querySelectorAll('.dialog-button');

                // Set event listeners
                controlButtons.forEach(input => {
                   // Update the form object in the service
                  input.addEventListener('click', ((e) => {
                    const suppsForm = this.suppsForm.value;
                    return this.mealService.suppsFormChange.next(suppsForm);
                  }) as EventListener);
               });
              }

  ngOnInit() {
    this.suppsForm = this.fb.group({
      guideline: ['', [Validators.required]],
      beforeOneArr: this.fb.array([ this.createProduct()]),
      duringOneArr: this.fb.array([ this.createProduct()]),
      afterOneArr: this.fb.array([ this.createProduct()]),
      beforeTwoArr: this.fb.array([ this.createProduct()]),
      duringTwoArr: this.fb.array([ this.createProduct()]),
      afterTwoArr: this.fb.array([ this.createProduct()]),
      beforeThreeArr: this.fb.array([ this.createProduct()]),
      duringThreeArr: this.fb.array([ this.createProduct()]),
      afterThreeArr: this.fb.array([ this.createProduct()]),
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });
  }


  // Guidelines

  guidelineHandler() {
    const id = this.suppsForm.get('guideline').value;
    this.guidelineService.getGuidelineDataById(id)
      .subscribe(guideline => {
        this.guideline = guideline;
        this.getExercises(guideline);
      });
  }

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
    }
    if (this.exerciseService.guideExercises.eThree) {
      this.exerciseService.guideExercises.eThree.subscribe(exercise => {
        this.exerciseThree = exercise;
      });
    }
    this.exercises = [
      this.exerciseOne,
      this.exerciseTwo,
      this.exerciseThree
    ];
  }


  get beforeOneForms() {
    return this.suppsForm.get('beforeOneArr') as FormArray;
  }

  get duringOneForms() {
    return this.suppsForm.get('duringOneArr') as FormArray;
  }

  get afterOneForms() {
    return this.suppsForm.get('afterOneArr') as FormArray;
  }

  get beforeTwoForms() {
    return this.suppsForm.get('beforeTwoArr') as FormArray;
  }

  get duringTwoForms() {
    return this.suppsForm.get('duringTwoArr') as FormArray;
  }

  get afterTwoForms() {
    return this.suppsForm.get('afterTwoArr') as FormArray;
  }

  get beforeThreeForms() {
    return this.suppsForm.get('beforeThreeArr') as FormArray;
  }

  get duringThreeForms() {
    return this.suppsForm.get('duringThreeArr') as FormArray;
  }

  get afterThreeForms() {
    return this.suppsForm.get('afterThreeArr') as FormArray;
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
        array = this.suppsForm.get('beforeOneArr') as FormArray;
        break;
      case 12:
        array = this.suppsForm.get('duringOneArr') as FormArray;
        break;
      case 13:
        array = this.suppsForm.get('afterOneArr') as FormArray;
        break;
      case 21:
        array = this.suppsForm.get('beforeTwoArr') as FormArray;
        break;
      case 22:
        array = this.suppsForm.get('duringTwoArr') as FormArray;
        break;
      case 23:
        array = this.suppsForm.get('afterTwoArr') as FormArray;
        break;
      case 31:
        array = this.suppsForm.get('beforeThreeArr') as FormArray;
        break;
      case 32:
        array = this.suppsForm.get('duringThreeArr') as FormArray;
        break;
      case 33:
        array = this.suppsForm.get('afterThreeArr') as FormArray;
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
        array = this.suppsForm.get('beforeOneArr') as FormArray;
        break;
      case 12:
        array = this.suppsForm.get('duringOneArr') as FormArray;
        break;
      case 13:
        array = this.suppsForm.get('afterOneArr') as FormArray;
        break;
      case 21:
        array = this.suppsForm.get('beforeTwoArr') as FormArray;
        break;
      case 22:
        array = this.suppsForm.get('duringTwoArr') as FormArray;
        break;
      case 23:
        array = this.suppsForm.get('afterTwoArr') as FormArray;
        break;
      case 31:
        array = this.suppsForm.get('beforeThreeArr') as FormArray;
        break;
      case 32:
        array = this.suppsForm.get('duringThreeArr') as FormArray;
        break;
      case 33:
        array = this.suppsForm.get('afterThreeArr') as FormArray;
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
