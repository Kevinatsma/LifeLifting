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
  selector: 'app-edit-wednesday-form',
  templateUrl: 'edit-wednesday-form.component.html',
  styleUrls: ['./../edit-meal-dialog.component.scss']
})
export class EditWednesdayFormComponent implements OnInit {
  @Input() foods: Array<Food>;
  @Input() mealTimes;
  @Input() client: User;
  @Input() mealplan;
  @Output() mealFormChange = new EventEmitter();
  user = User;
  specialistID;
  hide = true;
  exercises: Exercise[];

  ///////////////
  // FormGroups
  wednesdayMealForm: FormGroup;

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
               private editMealService: EditMealDialogService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.foodService.getFoods().subscribe(foods => this.foods = foods);
              }

  ngOnInit() {
    this.wednesdayMealForm = this.fb.group({
      mOneMealOneTitle: [`${this.mealplan.wednesdayMeals.mOneMealOneTitle}`, [Validators.required]],
      mOneMealOneArr: this.fb.array([]),
      mOneMealTwoTitle: [`${this.mealplan.wednesdayMeals.mOneMealTwoTitle}`],
      mOneMealTwoArr: this.fb.array([]),
      mTwoMealOneTitle: [`${this.mealplan.wednesdayMeals.mTwoMealOneTitle}`, [Validators.required]],
      mTwoMealOneArr: this.fb.array([]),
      mTwoMealTwoTitle: [`${this.mealplan.wednesdayMeals.mTwoMealTwoTitle}`],
      mTwoMealTwoArr: this.fb.array([]),
      mThreeMealOneTitle: [`${this.mealplan.wednesdayMeals.mThreeMealOneTitle}`, [Validators.required]],
      mThreeMealOneArr: this.fb.array([]),
      mThreeMealTwoTitle: [`${this.mealplan.wednesdayMeals.mThreeMealTwoTitle}`],
      mThreeMealTwoArr: this.fb.array([]),
      mFourMealOneTitle: [`${this.mealplan.wednesdayMeals.mFourMealOneTitle}`, [Validators.required]],
      mFourMealOneArr: this.fb.array([]),
      mFourMealTwoTitle: [`${this.mealplan.wednesdayMeals.mFourMealTwoTitle}`],
      mFourMealTwoArr: this.fb.array([]),
      mFiveMealOneTitle: [`${this.mealplan.wednesdayMeals.mFiveMealOneTitle}`, [Validators.required]],
      mFiveMealOneArr: this.fb.array([]),
      mFiveMealTwoTitle: [`${this.mealplan.wednesdayMeals.mFiveMealTwoTitle}`],
      mFiveMealTwoArr: this.fb.array([]),
      mSixMealOneTitle: [`${this.mealplan.wednesdayMeals.mSixMealOneTitle}`, [Validators.required]],
      mSixMealOneArr: this.fb.array([]),
      mSixMealTwoTitle: [`${this.mealplan.wednesdayMeals.mSixMealTwoTitle}`],
      mSixMealTwoArr: this.fb.array([]),
      mSevenMealOneTitle: [`${this.mealplan.wednesdayMeals.mSevenMealOneTitle}`, [Validators.required]],
      mSevenMealOneArr: this.fb.array([]),
      mSevenMealTwoTitle: [`${this.mealplan.wednesdayMeals.mSevenMealTwoTitle}`],
      mSevenMealTwoArr: this.fb.array([]),
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });

    this.loadForm();
  }


  // Update data when mat stepper changes steps
  updateData() {
    const data = this.wednesdayMealForm.value;
    return this.editMealService.wednesdayFormChange.next(data);
  }

  ///////////////////////////////////////////////////////////
  // Getters, get forms as array, to send to parent component
  ///////////////////////////////////////////////////////////
  get mOneMealOneForms() {
    return this.wednesdayMealForm.get('mOneMealOneArr') as FormArray;
  }
  get mOneMealTwoForms() {
    return this.wednesdayMealForm.get('mOneMealTwoArr') as FormArray;
  }
  get mTwoMealOneForms() {
    return this.wednesdayMealForm.get('mTwoMealOneArr') as FormArray;
  }
  get mTwoMealTwoForms() {
    return this.wednesdayMealForm.get('mTwoMealTwoArr') as FormArray;
  }
  get mThreeMealOneForms() {
    return this.wednesdayMealForm.get('mThreeMealOneArr') as FormArray;
  }
  get mThreeMealTwoForms() {
    return this.wednesdayMealForm.get('mThreeMealTwoArr') as FormArray;
  }
  get mFourMealOneForms() {
    return this.wednesdayMealForm.get('mFourMealOneArr') as FormArray;
  }
  get mFourMealTwoForms() {
    return this.wednesdayMealForm.get('mFourMealTwoArr') as FormArray;
  }
  get mFiveMealOneForms() {
    return this.wednesdayMealForm.get('mFiveMealOneArr') as FormArray;
  }
  get mFiveMealTwoForms() {
    return this.wednesdayMealForm.get('mFiveMealTwoArr') as FormArray;
  }
  get mSixMealOneForms() {
    return this.wednesdayMealForm.get('mSixMealOneArr') as FormArray;
  }
  get mSixMealTwoForms() {
    return this.wednesdayMealForm.get('mSixMealTwoArr') as FormArray;
  }
  get mSevenMealOneForms() {
    return this.wednesdayMealForm.get('mSevenMealOneArr') as FormArray;
  }
  get mSevenMealTwoForms() {
    return this.wednesdayMealForm.get('mSevenMealTwoArr') as FormArray;
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
        array = this.wednesdayMealForm.get('mOneMealOneArr') as FormArray;
        break;
      case 12:
        array = this.wednesdayMealForm.get('mOneMealTwoArr') as FormArray;
        break;
      case 21:
        array = this.wednesdayMealForm.get('mTwoMealOneArr') as FormArray;
        break;
      case 22:
      array = this.wednesdayMealForm.get('mTwoMealTwoArr') as FormArray;
        break;
      case 31:
      array = this.wednesdayMealForm.get('mThreeMealOneArr') as FormArray;
        break;
      case 32:
      array = this.wednesdayMealForm.get('mThreeMealTwoArr') as FormArray;
        break;
      case 41:
      array = this.wednesdayMealForm.get('mFourMealOneArr') as FormArray;
        break;
      case 42:
      array = this.wednesdayMealForm.get('mFourMealTwoArr') as FormArray;
        break;
      case 51:
      array = this.wednesdayMealForm.get('mFiveMealOneArr') as FormArray;
        break;
      case 52:
      array = this.wednesdayMealForm.get('mFiveMealTwoArr') as FormArray;
        break;
      case 61:
      array = this.wednesdayMealForm.get('mSixMealOneArr') as FormArray;
        break;
      case 62:
      array = this.wednesdayMealForm.get('mSixMealTwoArr') as FormArray;
        break;
      case 71:
      array = this.wednesdayMealForm.get('mSevenMealOneArr') as FormArray;
        break;
      case 72:
      array = this.wednesdayMealForm.get('mSevenMealTwoArr') as FormArray;
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
        array = this.wednesdayMealForm.get('mOneMealOneArr') as FormArray;
        break;
      case 12:
        array = this.wednesdayMealForm.get('mOneMealTwoArr') as FormArray;
        break;
      case 21:
        array = this.wednesdayMealForm.get('mTwoMealOneArr') as FormArray;
        break;
      case 22:
      array = this.wednesdayMealForm.get('mTwoMealTwoArr') as FormArray;
        break;
      case 31:
      array = this.wednesdayMealForm.get('mThreeMealOneArr') as FormArray;
        break;
      case 32:
      array = this.wednesdayMealForm.get('mThreeMealTwoArr') as FormArray;
        break;
      case 41:
        array = this.wednesdayMealForm.get('mFourMealOneArr') as FormArray;
        break;
      case 42:
        array = this.wednesdayMealForm.get('mFourMealTwoArr') as FormArray;
        break;
      case 51:
        array = this.wednesdayMealForm.get('mFiveMealOneArr') as FormArray;
        break;
      case 52:
      array = this.wednesdayMealForm.get('mFiveMealTwoArr') as FormArray;
        break;
      case 61:
      array = this.wednesdayMealForm.get('mSixMealOneArr') as FormArray;
        break;
      case 62:
      array = this.wednesdayMealForm.get('mSixMealTwoArr') as FormArray;
        break;
      case 71:
      array = this.wednesdayMealForm.get('mSevenMealOneArr') as FormArray;
        break;
      case 72:
      array = this.wednesdayMealForm.get('mSevenMealTwoArr') as FormArray;
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
  loadForm() {
    const mOneMealOneArr = this.mOneMealOneForms;
    const amountofMealsOneOne = this.mealplan.wednesdayMeals.mOneMealOneArr;
    amountofMealsOneOne.forEach(obj => {
      mOneMealOneArr.push(this.createProduct(obj));
    });

    const mOneMealTwoArr = this.mOneMealTwoForms;
    const amountofMealsOneTwo = this.mealplan.wednesdayMeals.mOneMealTwoArr;
    amountofMealsOneTwo.forEach(obj => {
      mOneMealTwoArr.push(this.createProduct(obj));
    });

    const mTwoMealOneArr = this.mTwoMealOneForms;
    const amountofMealsTwoOne = this.mealplan.wednesdayMeals.mTwoMealOneArr;
    amountofMealsTwoOne.forEach(obj => {
      mTwoMealOneArr.push(this.createProduct(obj));
    });

    const mTwoMealTwoArr = this.mTwoMealTwoForms;
    const amountofMealsTwoTwo = this.mealplan.wednesdayMeals.mTwoMealTwoArr;
    amountofMealsTwoTwo.forEach(obj => {
      mTwoMealTwoArr.push(this.createProduct(obj));
    });

    const mThreeMealOneArr = this.mThreeMealOneForms;
    const amountofMealsThreeOne = this.mealplan.wednesdayMeals.mThreeMealOneArr;
    amountofMealsThreeOne.forEach(obj => {
      mThreeMealOneArr.push(this.createProduct(obj));
    });

    const mThreeMealTwoArr = this.mThreeMealTwoForms;
    const amountofMealsThreeTwo = this.mealplan.wednesdayMeals.mThreeMealTwoArr;
    amountofMealsThreeTwo.forEach(obj => {
      mThreeMealTwoArr.push(this.createProduct(obj));
    });

    const mFourMealOneArr = this.mFourMealOneForms;
    const amountofMealsFourOne = this.mealplan.wednesdayMeals.mFourMealOneArr;
    amountofMealsFourOne.forEach(obj => {
      mFourMealOneArr.push(this.createProduct(obj));
    });

    const mFourMealTwoArr = this.mFourMealTwoForms;
    const amountofMealsFourTwo = this.mealplan.wednesdayMeals.mFourMealTwoArr;
    amountofMealsFourTwo.forEach(obj => {
      mFourMealTwoArr.push(this.createProduct(obj));
    });

    const mFiveMealOneArr = this.mFiveMealOneForms;
    const amountofMealsFiveOne = this.mealplan.wednesdayMeals.mFiveMealOneArr;
    amountofMealsFiveOne.forEach(obj => {
      mFiveMealOneArr.push(this.createProduct(obj));
    });

    const mFiveMealTwoArr = this.mFiveMealTwoForms;
    const amountofMealsFiveTwo = this.mealplan.wednesdayMeals.mFiveMealTwoArr;
    amountofMealsFiveTwo.forEach(obj => {
      mFiveMealTwoArr.push(this.createProduct(obj));
    });

    const mSixMealOneArr = this.mSixMealOneForms;
    const amountofMealsSixOne = this.mealplan.wednesdayMeals.mSixMealOneArr;
    amountofMealsSixOne.forEach(obj => {
      mSixMealOneArr.push(this.createProduct(obj));
    });

    const mSixMealTwoArr = this.mSixMealTwoForms;
    const amountofMealsSixTwo = this.mealplan.wednesdayMeals.mSixMealTwoArr;
    amountofMealsSixTwo.forEach(obj => {
      mSixMealTwoArr.push(this.createProduct(obj));
    });

    const mSevenMealOneArr = this.mSevenMealOneForms;
    const amountofMealsSevenOne = this.mealplan.wednesdayMeals.mSevenMealOneArr;
    amountofMealsSevenOne.forEach(obj => {
      mSevenMealOneArr.push(this.createProduct(obj));
    });

    const mSevenMealTwoArr = this.mSevenMealTwoForms;
    const amountofMealsSevenTwo = this.mealplan.wednesdayMeals.mSevenMealTwoArr;
    amountofMealsSevenTwo.forEach(obj => {
      mSevenMealTwoArr.push(this.createProduct(obj));
    });
  }
}
