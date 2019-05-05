
import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../../user/user.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserService } from '../../../../user/user.service';
import { Exercise } from '../../../../exercises/exercise.model';
import { Food } from '../../../../foods/food.model';
import { FoodService } from '../../../../foods/food.service';
import { EditMealDialogService } from '../edit-meal-dialog.service';
import { Guideline } from '../../../../guidelines/guideline.model';
import { GuidelineService } from '../../../../guidelines/guideline.service';
import { ExerciseService } from '../../../../exercises/exercise.service';
import { SuppsForm } from '../../add-meal-dialog/supps-form.model';

@Component({
  selector: 'app-edit-supps-form',
  templateUrl: 'edit-supps-form.component.html',
  styleUrls: ['./../edit-meal-dialog.component.scss']
})

export class EditSuppsFormComponent implements OnInit {
  @Input() foods: Array<Food>;
  @Input() supplementation: SuppsForm;
  @Input() client: User;
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
               private editMealService: EditMealDialogService,
               private exerciseService: ExerciseService,
               public guidelineService: GuidelineService,
               public matDialog: MatDialog) {
                this.foodService.getFoods().subscribe(foods => this.foods = foods);

                // Get guidelines
                setTimeout(() => {
                  this.guidelineService.getGuidelinesByClient(this.client.uid).subscribe(guidelines => {
                    this.guidelines = guidelines;

                    if (this.guidelines.length < 1) {
                      this.guidelines = null;
                    }
                  });

                  this.loadForm(this.supplementation);
                  this.guidelineHandler();
                }, 500);
              }

  ngOnInit() {
    this.suppsForm = this.fb.group({
      guideline: [`${this.supplementation.guideline}`, [Validators.required]],
      beforeOneArr: this.fb.array([]),
      duringOneArr: this.fb.array([]),
      afterOneArr: this.fb.array([]),
      beforeTwoArr: this.fb.array([]),
      duringTwoArr: this.fb.array([]),
      afterTwoArr: this.fb.array([]),
      beforeThreeArr: this.fb.array([]),
      duringThreeArr: this.fb.array([]),
      afterThreeArr: this.fb.array([]),
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });
  }

  // Update data when mat stepper changes steps
  updateData() {
    const data = this.suppsForm.value;
    return this.editMealService.suppsFormChange.next(data);
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

  //////////////////////////////////////////////////////////////
  // Creating, adding, deleting and checking product Formarrays
  //////////////////////////////////////////////////////////////

  createProduct(data): FormGroup {
    return this.fb.group({
      product: data.product,
      amount: data.amount,
      prep: data.prep,
    });
  }

  createNewProduct(): FormGroup {
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
    return array.push(this.createNewProduct());
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

  // Fill the form with data
  loadForm(data) {
    const beforeOneArr = this.beforeOneForms;
    const amountOfBeforeOne = this.supplementation.beforeOneArr;
    amountOfBeforeOne.forEach(obj => {
      beforeOneArr.push(this.createProduct(obj));
    });

    const duringOneArr = this.duringOneForms;
    const amountOfDuringOne = this.supplementation.duringOneArr;
    amountOfDuringOne.forEach(obj => {
      duringOneArr.push(this.createProduct(obj));
    });

    const afterOneArr = this.afterOneForms;
    const amountOfAfterOne = this.supplementation.afterOneArr;
    amountOfAfterOne.forEach(obj => {
      afterOneArr.push(this.createProduct(obj));
    });

    const beforeTwoArr = this.beforeTwoForms;
    const amountOfBeforeTwo = this.supplementation.beforeTwoArr;
    amountOfBeforeTwo.forEach(obj => {
      beforeTwoArr.push(this.createProduct(obj));
    });

    const duringTwoArr = this.duringTwoForms;
    const amountOfDuringTwo = this.supplementation.duringTwoArr;
    amountOfDuringTwo.forEach(obj => {
      duringTwoArr.push(this.createProduct(obj));
    });

    const afterTwoArr = this.afterTwoForms;
    const amountOfAfterTwo = this.supplementation.afterTwoArr;
    amountOfAfterTwo.forEach(obj => {
      afterTwoArr.push(this.createProduct(obj));
    });

    const beforeThreeArr = this.beforeThreeForms;
    const amountOfBeforeThree = this.supplementation.beforeThreeArr;
    amountOfBeforeThree.forEach(obj => {
      beforeThreeArr.push(this.createProduct(obj));
    });

    const duringThreeArr = this.duringThreeForms;
    const amountOfDuringThree = this.supplementation.duringThreeArr;
    amountOfDuringThree.forEach(obj => {
      duringThreeArr.push(this.createProduct(obj));
    });

    const afterThreeArr = this.afterOneForms;
    const amountOfAfterThree = this.supplementation.afterThreeArr;
    amountOfAfterThree.forEach(obj => {
      afterThreeArr.push(this.createProduct(obj));
    });
  }
}
