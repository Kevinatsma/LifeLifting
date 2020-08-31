import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../user/user.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserService } from '../../../../user/user.service';
import { Exercise } from '../../../../exercises/exercise.model';
import { Food } from '../../../../foods/food.model';
import { FoodService } from '../../../../foods/food.service';
import { EditMealDialogService } from '../edit-meal-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-friday-form',
  templateUrl: 'edit-friday-form.component.html',
  styleUrls: ['./../edit-meal-dialog.component.scss']
})
export class EditFridayFormComponent implements OnInit, OnDestroy {
  @Input() foods: Array<Food>;
  @Input() mealTimes;
  @Input() client: User;
  @Input() mealplan;
  @Output() mealFormChange = new EventEmitter();
  user = User;
  specialistID;
  specialistID$: Subscription;
  hide = true;
  exercises: Exercise[];

  ///////////////
  // FormGroups
  fridayMealForm: FormGroup;

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
              }

  ngOnInit() {
    this.fridayMealForm = this.fb.group({
      mOneMealOneTitle: [`${this.mealplan.fridayMeals.mOneMealOneTitle}`, [Validators.required]],
      mOneMealOneArr: this.fb.array([]),
      mOneMealTwoTitle: [`${this.mealplan.fridayMeals.mOneMealTwoTitle}`],
      mOneMealTwoArr: this.fb.array([]),
      mTwoMealOneTitle: [`${this.mealplan.fridayMeals.mTwoMealOneTitle}`, [Validators.required]],
      mTwoMealOneArr: this.fb.array([]),
      mTwoMealTwoTitle: [`${this.mealplan.fridayMeals.mTwoMealTwoTitle}`],
      mTwoMealTwoArr: this.fb.array([]),
      mThreeMealOneTitle: [`${this.mealplan.fridayMeals.mThreeMealOneTitle}`, [Validators.required]],
      mThreeMealOneArr: this.fb.array([]),
      mThreeMealTwoTitle: [`${this.mealplan.fridayMeals.mThreeMealTwoTitle}`],
      mThreeMealTwoArr: this.fb.array([]),
      mFourMealOneTitle: [`${this.mealplan.fridayMeals.mFourMealOneTitle}`, [Validators.required]],
      mFourMealOneArr: this.fb.array([]),
      mFourMealTwoTitle: [`${this.mealplan.fridayMeals.mFourMealTwoTitle}`],
      mFourMealTwoArr: this.fb.array([]),
      mFiveMealOneTitle: [`${this.mealplan.fridayMeals.mFiveMealOneTitle}`, [Validators.required]],
      mFiveMealOneArr: this.fb.array([]),
      mFiveMealTwoTitle: [`${this.mealplan.fridayMeals.mFiveMealTwoTitle}`],
      mFiveMealTwoArr: this.fb.array([]),
      mSixMealOneTitle: [`${this.mealplan.fridayMeals.mSixMealOneTitle}`, [Validators.required]],
      mSixMealOneArr: this.fb.array([]),
      mSixMealTwoTitle: [`${this.mealplan.fridayMeals.mSixMealTwoTitle}`],
      mSixMealTwoArr: this.fb.array([]),
      mSevenMealOneTitle: [`${this.mealplan.fridayMeals.mSevenMealOneTitle}`, [Validators.required]],
      mSevenMealOneArr: this.fb.array([]),
      mSevenMealTwoTitle: [`${this.mealplan.fridayMeals.mSevenMealTwoTitle}`],
      mSevenMealTwoArr: this.fb.array([]),
    });

    this.specialistID$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });

    this.loadForm();
  }

  ngOnDestroy() {
    this.specialistID$.unsubscribe();
  }

  // Update data when mat stepper changes steps
  updateData() {
    const data = this.fridayMealForm.value;
    return this.editMealService.fridayFormChange.next(data);
  }

  ///////////////////////////////////////////////////////////
  // Getters, get forms as array, to send to parent component
  ///////////////////////////////////////////////////////////
  get mOneMealOneForms() {
    return this.fridayMealForm.get('mOneMealOneArr') as FormArray;
  }
  get mOneMealTwoForms() {
    return this.fridayMealForm.get('mOneMealTwoArr') as FormArray;
  }
  get mTwoMealOneForms() {
    return this.fridayMealForm.get('mTwoMealOneArr') as FormArray;
  }
  get mTwoMealTwoForms() {
    return this.fridayMealForm.get('mTwoMealTwoArr') as FormArray;
  }
  get mThreeMealOneForms() {
    return this.fridayMealForm.get('mThreeMealOneArr') as FormArray;
  }
  get mThreeMealTwoForms() {
    return this.fridayMealForm.get('mThreeMealTwoArr') as FormArray;
  }
  get mFourMealOneForms() {
    return this.fridayMealForm.get('mFourMealOneArr') as FormArray;
  }
  get mFourMealTwoForms() {
    return this.fridayMealForm.get('mFourMealTwoArr') as FormArray;
  }
  get mFiveMealOneForms() {
    return this.fridayMealForm.get('mFiveMealOneArr') as FormArray;
  }
  get mFiveMealTwoForms() {
    return this.fridayMealForm.get('mFiveMealTwoArr') as FormArray;
  }
  get mSixMealOneForms() {
    return this.fridayMealForm.get('mSixMealOneArr') as FormArray;
  }
  get mSixMealTwoForms() {
    return this.fridayMealForm.get('mSixMealTwoArr') as FormArray;
  }
  get mSevenMealOneForms() {
    return this.fridayMealForm.get('mSevenMealOneArr') as FormArray;
  }
  get mSevenMealTwoForms() {
    return this.fridayMealForm.get('mSevenMealTwoArr') as FormArray;
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
    const productArray = this.checkProductArray(number);
    this.checkProduct(productArray);
    return productArray.push(this.createNewProduct());
  }

  deleteProduct(number, i) {
    const productArray = this.checkProductArray(number);
    this.checkProduct(productArray);
    return productArray.removeAt(i);
  }

  checkProduct(array): void {
    if (array.length < 10) {
      this.showAddProduct = true;
    } else {
      this.showAddProduct = false;
    }
  }

  clearFields(number, i) {
    const productArray = this.checkProductArray(number);
    productArray.controls[i].get('prep').reset();
  }

  // Fill the form with data
  loadForm() {
    const mOneMealOneArr = this.mOneMealOneForms;
    const amountofMealsOneOne = this.mealplan.fridayMeals.mOneMealOneArr;
    amountofMealsOneOne.forEach(obj => {
      mOneMealOneArr.push(this.createProduct(obj));
    });

    const mOneMealTwoArr = this.mOneMealTwoForms;
    const amountofMealsOneTwo = this.mealplan.fridayMeals.mOneMealTwoArr;
    amountofMealsOneTwo.forEach(obj => {
      mOneMealTwoArr.push(this.createProduct(obj));
    });

    const mTwoMealOneArr = this.mTwoMealOneForms;
    const amountofMealsTwoOne = this.mealplan.fridayMeals.mTwoMealOneArr;
    amountofMealsTwoOne.forEach(obj => {
      mTwoMealOneArr.push(this.createProduct(obj));
    });

    const mTwoMealTwoArr = this.mTwoMealTwoForms;
    const amountofMealsTwoTwo = this.mealplan.fridayMeals.mTwoMealTwoArr;
    amountofMealsTwoTwo.forEach(obj => {
      mTwoMealTwoArr.push(this.createProduct(obj));
    });

    const mThreeMealOneArr = this.mThreeMealOneForms;
    const amountofMealsThreeOne = this.mealplan.fridayMeals.mThreeMealOneArr;
    amountofMealsThreeOne.forEach(obj => {
      mThreeMealOneArr.push(this.createProduct(obj));
    });

    const mThreeMealTwoArr = this.mThreeMealTwoForms;
    const amountofMealsThreeTwo = this.mealplan.fridayMeals.mThreeMealTwoArr;
    amountofMealsThreeTwo.forEach(obj => {
      mThreeMealTwoArr.push(this.createProduct(obj));
    });

    const mFourMealOneArr = this.mFourMealOneForms;
    const amountofMealsFourOne = this.mealplan.fridayMeals.mFourMealOneArr;
    amountofMealsFourOne.forEach(obj => {
      mFourMealOneArr.push(this.createProduct(obj));
    });

    const mFourMealTwoArr = this.mFourMealTwoForms;
    const amountofMealsFourTwo = this.mealplan.fridayMeals.mFourMealTwoArr;
    amountofMealsFourTwo.forEach(obj => {
      mFourMealTwoArr.push(this.createProduct(obj));
    });

    const mFiveMealOneArr = this.mFiveMealOneForms;
    const amountofMealsFiveOne = this.mealplan.fridayMeals.mFiveMealOneArr;
    amountofMealsFiveOne.forEach(obj => {
      mFiveMealOneArr.push(this.createProduct(obj));
    });

    const mFiveMealTwoArr = this.mFiveMealTwoForms;
    const amountofMealsFiveTwo = this.mealplan.fridayMeals.mFiveMealTwoArr;
    amountofMealsFiveTwo.forEach(obj => {
      mFiveMealTwoArr.push(this.createProduct(obj));
    });

    const mSixMealOneArr = this.mSixMealOneForms;
    const amountofMealsSixOne = this.mealplan.fridayMeals.mSixMealOneArr;
    amountofMealsSixOne.forEach(obj => {
      mSixMealOneArr.push(this.createProduct(obj));
    });

    const mSixMealTwoArr = this.mSixMealTwoForms;
    const amountofMealsSixTwo = this.mealplan.fridayMeals.mSixMealTwoArr;
    amountofMealsSixTwo.forEach(obj => {
      mSixMealTwoArr.push(this.createProduct(obj));
    });

    const mSevenMealOneArr = this.mSevenMealOneForms;
    const amountofMealsSevenOne = this.mealplan.fridayMeals.mSevenMealOneArr;
    amountofMealsSevenOne.forEach(obj => {
      mSevenMealOneArr.push(this.createProduct(obj));
    });

    const mSevenMealTwoArr = this.mSevenMealTwoForms;
    const amountofMealsSevenTwo = this.mealplan.fridayMeals.mSevenMealTwoArr;
    amountofMealsSevenTwo.forEach(obj => {
      mSevenMealTwoArr.push(this.createProduct(obj));
    });
  }


  checkProductArray(number) {
    let array;

    // Conditionals for all 7 possible mealtimes and thus 14 possible meals
    switch (number) {
      case 11:
        array = this.mOneMealOneForms;
        break;
      case 12:
        array = this.mOneMealTwoForms;
        break;
      case 21:
        array = this.mTwoMealOneForms;
        break;
      case 22:
      array = this.mTwoMealTwoForms;
        break;
      case 31:
      array = this.mThreeMealOneForms;
        break;
      case 32:
      array = this.mThreeMealTwoForms;
        break;
      case 41:
      array = this.mFourMealOneForms;
        break;
      case 42:
      array = this.mFourMealTwoForms;
        break;
      case 51:
      array = this.mFiveMealOneForms;
        break;
      case 52:
      array = this.mFiveMealTwoForms;
        break;
      case 61:
      array = this.mSixMealOneForms;
        break;
      case 62:
      array = this.mSixMealTwoForms;
        break;
      case 71:
      array = this.mSevenMealOneForms;
        break;
      case 72:
      array = this.mSevenMealTwoForms;
        break;
      default:
        array = null;
    }

    return array;
  }
}
