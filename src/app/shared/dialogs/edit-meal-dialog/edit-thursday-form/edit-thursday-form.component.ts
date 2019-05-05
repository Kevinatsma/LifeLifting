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
  selector: 'app-edit-thursday-form',
  templateUrl: 'edit-thursday-form.component.html',
  styleUrls: ['./../edit-meal-dialog.component.scss']
})
export class EditThursdayFormComponent implements OnInit {
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
  thursdayMealForm: FormGroup;

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
    this.thursdayMealForm = this.fb.group({
      mOneMealOneTitle: [`${this.mealplan.thursdayMeals.mOneMealOneTitle}`, [Validators.required]],
      mOneMealOneArr: this.fb.array([]),
      mOneMealTwoTitle: [`${this.mealplan.thursdayMeals.mOneMealTwoTitle}`],
      mOneMealTwoArr: this.fb.array([]),
      mTwoMealOneTitle: [`${this.mealplan.thursdayMeals.mTwoMealOneTitle}`, [Validators.required]],
      mTwoMealOneArr: this.fb.array([]),
      mTwoMealTwoTitle: [`${this.mealplan.thursdayMeals.mTwoMealTwoTitle}`],
      mTwoMealTwoArr: this.fb.array([]),
      mThreeMealOneTitle: [`${this.mealplan.thursdayMeals.mThreeMealOneTitle}`, [Validators.required]],
      mThreeMealOneArr: this.fb.array([]),
      mThreeMealTwoTitle: [`${this.mealplan.thursdayMeals.mThreeMealTwoTitle}`],
      mThreeMealTwoArr: this.fb.array([]),
      mFourMealOneTitle: [`${this.mealplan.thursdayMeals.mFourMealOneTitle}`, [Validators.required]],
      mFourMealOneArr: this.fb.array([]),
      mFourMealTwoTitle: [`${this.mealplan.thursdayMeals.mFourMealTwoTitle}`],
      mFourMealTwoArr: this.fb.array([]),
      mFiveMealOneTitle: [`${this.mealplan.thursdayMeals.mFiveMealOneTitle}`, [Validators.required]],
      mFiveMealOneArr: this.fb.array([]),
      mFiveMealTwoTitle: [`${this.mealplan.thursdayMeals.mFiveMealTwoTitle}`],
      mFiveMealTwoArr: this.fb.array([]),
      mSixMealOneTitle: [`${this.mealplan.thursdayMeals.mSixMealOneTitle}`, [Validators.required]],
      mSixMealOneArr: this.fb.array([]),
      mSixMealTwoTitle: [`${this.mealplan.thursdayMeals.mSixMealTwoTitle}`],
      mSixMealTwoArr: this.fb.array([]),
      mSevenMealOneTitle: [`${this.mealplan.thursdayMeals.mSevenMealOneTitle}`, [Validators.required]],
      mSevenMealOneArr: this.fb.array([]),
      mSevenMealTwoTitle: [`${this.mealplan.thursdayMeals.mSevenMealTwoTitle}`],
      mSevenMealTwoArr: this.fb.array([]),
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });

    this.loadForm();
  }

  // Update data when mat stepper changes steps
  updateData() {
    const data = this.thursdayMealForm.value;
    return this.editMealService.thursdayFormChange.next(data);
  }

  ///////////////////////////////////////////////////////////
  // Getters, get forms as array, to send to parent component
  ///////////////////////////////////////////////////////////
  get mOneMealOneForms() {
    return this.thursdayMealForm.get('mOneMealOneArr') as FormArray;
  }
  get mOneMealTwoForms() {
    return this.thursdayMealForm.get('mOneMealTwoArr') as FormArray;
  }
  get mTwoMealOneForms() {
    return this.thursdayMealForm.get('mTwoMealOneArr') as FormArray;
  }
  get mTwoMealTwoForms() {
    return this.thursdayMealForm.get('mTwoMealTwoArr') as FormArray;
  }
  get mThreeMealOneForms() {
    return this.thursdayMealForm.get('mThreeMealOneArr') as FormArray;
  }
  get mThreeMealTwoForms() {
    return this.thursdayMealForm.get('mThreeMealTwoArr') as FormArray;
  }
  get mFourMealOneForms() {
    return this.thursdayMealForm.get('mFourMealOneArr') as FormArray;
  }
  get mFourMealTwoForms() {
    return this.thursdayMealForm.get('mFourMealTwoArr') as FormArray;
  }
  get mFiveMealOneForms() {
    return this.thursdayMealForm.get('mFiveMealOneArr') as FormArray;
  }
  get mFiveMealTwoForms() {
    return this.thursdayMealForm.get('mFiveMealTwoArr') as FormArray;
  }
  get mSixMealOneForms() {
    return this.thursdayMealForm.get('mSixMealOneArr') as FormArray;
  }
  get mSixMealTwoForms() {
    return this.thursdayMealForm.get('mSixMealTwoArr') as FormArray;
  }
  get mSevenMealOneForms() {
    return this.thursdayMealForm.get('mSevenMealOneArr') as FormArray;
  }
  get mSevenMealTwoForms() {
    return this.thursdayMealForm.get('mSevenMealTwoArr') as FormArray;
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
    const amountofMealsOneOne = this.mealplan.thursdayMeals.mOneMealOneArr;
    amountofMealsOneOne.forEach(obj => {
      mOneMealOneArr.push(this.createProduct(obj));
    });

    const mOneMealTwoArr = this.mOneMealTwoForms;
    const amountofMealsOneTwo = this.mealplan.thursdayMeals.mOneMealTwoArr;
    amountofMealsOneTwo.forEach(obj => {
      mOneMealTwoArr.push(this.createProduct(obj));
    });

    const mTwoMealOneArr = this.mTwoMealOneForms;
    const amountofMealsTwoOne = this.mealplan.thursdayMeals.mTwoMealOneArr;
    amountofMealsTwoOne.forEach(obj => {
      mTwoMealOneArr.push(this.createProduct(obj));
    });

    const mTwoMealTwoArr = this.mTwoMealTwoForms;
    const amountofMealsTwoTwo = this.mealplan.thursdayMeals.mTwoMealTwoArr;
    amountofMealsTwoTwo.forEach(obj => {
      mTwoMealTwoArr.push(this.createProduct(obj));
    });

    const mThreeMealOneArr = this.mThreeMealOneForms;
    const amountofMealsThreeOne = this.mealplan.thursdayMeals.mThreeMealOneArr;
    amountofMealsThreeOne.forEach(obj => {
      mThreeMealOneArr.push(this.createProduct(obj));
    });

    const mThreeMealTwoArr = this.mThreeMealTwoForms;
    const amountofMealsThreeTwo = this.mealplan.thursdayMeals.mThreeMealTwoArr;
    amountofMealsThreeTwo.forEach(obj => {
      mThreeMealTwoArr.push(this.createProduct(obj));
    });

    const mFourMealOneArr = this.mFourMealOneForms;
    const amountofMealsFourOne = this.mealplan.thursdayMeals.mFourMealOneArr;
    amountofMealsFourOne.forEach(obj => {
      mFourMealOneArr.push(this.createProduct(obj));
    });

    const mFourMealTwoArr = this.mFourMealTwoForms;
    const amountofMealsFourTwo = this.mealplan.thursdayMeals.mFourMealTwoArr;
    amountofMealsFourTwo.forEach(obj => {
      mFourMealTwoArr.push(this.createProduct(obj));
    });

    const mFiveMealOneArr = this.mFiveMealOneForms;
    const amountofMealsFiveOne = this.mealplan.thursdayMeals.mFiveMealOneArr;
    amountofMealsFiveOne.forEach(obj => {
      mFiveMealOneArr.push(this.createProduct(obj));
    });

    const mFiveMealTwoArr = this.mFiveMealTwoForms;
    const amountofMealsFiveTwo = this.mealplan.thursdayMeals.mFiveMealTwoArr;
    amountofMealsFiveTwo.forEach(obj => {
      mFiveMealTwoArr.push(this.createProduct(obj));
    });

    const mSixMealOneArr = this.mSixMealOneForms;
    const amountofMealsSixOne = this.mealplan.thursdayMeals.mSixMealOneArr;
    amountofMealsSixOne.forEach(obj => {
      mSixMealOneArr.push(this.createProduct(obj));
    });

    const mSixMealTwoArr = this.mSixMealTwoForms;
    const amountofMealsSixTwo = this.mealplan.thursdayMeals.mSixMealTwoArr;
    amountofMealsSixTwo.forEach(obj => {
      mSixMealTwoArr.push(this.createProduct(obj));
    });

    const mSevenMealOneArr = this.mSevenMealOneForms;
    const amountofMealsSevenOne = this.mealplan.thursdayMeals.mSevenMealOneArr;
    amountofMealsSevenOne.forEach(obj => {
      mSevenMealOneArr.push(this.createProduct(obj));
    });

    const mSevenMealTwoArr = this.mSevenMealTwoForms;
    const amountofMealsSevenTwo = this.mealplan.thursdayMeals.mSevenMealTwoArr;
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
