import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Mealplan } from '../mealplans/mealplan.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MealplanService } from '../mealplans/mealplan.service';
import { getComponentViewDefinitionFactory } from '@angular/core/src/view';
import { AnimationTransitionInstructionType } from '@angular/animations/browser/src/render/animation_engine_instruction';
import { Food } from '../foods/food.model';
import { FoodService } from '../foods/food.service';
import { MatDialog } from '@angular/material';
import { PrintShoppingListComponent } from './print-shopping-list/print-shopping-list.component';
import { UtilService } from '../shared/services/util.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.scss']
})
export class ShoppingListDetailComponent implements OnInit, OnDestroy {
  mealplan: Mealplan;
  mealplan$: Subscription;
  foods: Food[];
  foods$: Subscription;
  foodArr: Array<any> = [];
  countFoodItemArr: Array<any> = [];
  allFoodItemsArr: Array<any> = [];
  shoppingListItems: Array<any> = [];

  constructor( private route: ActivatedRoute,
               private foodService: FoodService,
               private mealplanService: MealplanService,
               public router: Router,
               private dialog: MatDialog,
               private utils: UtilService) { }

  ngOnInit() {
    this.getMealplan();
  }

  ngOnDestroy() {
    this.foods$.unsubscribe();
    this.mealplan$.unsubscribe();
  }

  getMealplan() {
    const id = this.route.snapshot.paramMap.get('id');
    this.foods$ = this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;

      this.mealplan$ = this.mealplanService.getMealplanDataById(id).subscribe(mealplan => {
        this.mealplan = mealplan;
        this.getArrays(mealplan);
      });
    });

  }

  getArrays(mealplan) {
    const mondayMeals = mealplan.mondayMeals;
    const tuesdayMeals = mealplan.tuesdayMeals;
    const wednesdayMeals = mealplan.wednesdayMeals;
    const thursdayMeals = mealplan.thursdayMeals;
    const fridayMeals = mealplan.fridayMeals;
    const suppsMeals = mealplan.supplementation;

    this.getMonday(mondayMeals);
    this.getTuesday(tuesdayMeals);
    this.getWednesday(wednesdayMeals);
    this.getThursday(thursdayMeals);
    this.getFriday(fridayMeals);
    this.getSupps(suppsMeals);

    // Push  every food  item into  this  array and do  magic tricks with it later
    this.formatData();
  }

  formatData() {
    // FoodItemArr is an array that contains food names for all items * amount in a mealplan
    const foodItemArr = [];

    // Create array for all food objects (allFoodItemsArr)
    this.foodArr.reduce((obj, item) => {
      const foodObj = {
        foodItem: item.product,
        amount: item.amount
      };

      // For each food item in the mealplan, push it's value * amount to the foodItemArr
      for (let i = 0; i < foodObj.amount; i++) {
        foodItemArr.push(foodObj.foodItem.shoppingListName);
      }
    });

    // Group and count all food items
    this.countFoodItemArr = foodItemArr.reduce(function(obj, item) {
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item]++;
      return obj;
    }, {});

    // Add data to food items and push to shopping list array
    const shoppingListItemArr = [];
    const countObj = this.countFoodItemArr;

    Object.keys(countObj).forEach((key) => {
      const value = countObj[key];
      const shoppingListItem = this.fillShoppingListItem(key, value);
      shoppingListItemArr.push(shoppingListItem);
    });

    // Sort based on food category
    shoppingListItemArr.sort(this.utils.dynamicSort('nutritionType', 1));

    this.shoppingListItems = shoppingListItemArr;
  }

  fillShoppingListItem(key, value) {
    const foodObj = this.foods.filter(food => food.shoppingListName === `${key}`);
    let factor;
    let shoppingUnit;
    let shoppingListAmount;
    let unit;
    let nutritionType;

    foodObj.forEach(food => {
      factor = food.factor;
      unit = food.unit;
      shoppingUnit = food.shoppingUnit;
      shoppingListAmount = value * food.factor;
      nutritionType = food.categories.nutritionType;

      if (shoppingUnit === 'gram' &&  shoppingListAmount > 1000) {
        shoppingUnit = 'kilogram';
        shoppingListAmount = shoppingListAmount / 1000;
      } else if (shoppingUnit.toLowerCase() === 'milliliter' &&  shoppingListAmount > 1000) {
        shoppingUnit = 'liter';
        shoppingListAmount = shoppingListAmount / 1000;
      }
    });

    const shoppingListItem = {
      productName: key,
      amount: value,
      factor: factor,
      unit: unit,
      shoppingUnit: shoppingUnit,
      shoppingListAmount: shoppingListAmount,
      nutritionType: nutritionType
    };

    return shoppingListItem;
  }

  updateListItem(e) {
    const id = e.source._uniqueId;
    const checkboxField = document.getElementById(`${id}`);
    if (checkboxField.classList.contains('completed')) {
      checkboxField.classList.remove('completed');
    } else {
      checkboxField.classList.add('completed');
    }
  }

  openPrintDialog(shoppingListItems) {
    const dialogRef = this.dialog.open(PrintShoppingListComponent, {
      data: {
        shoppingListItems: shoppingListItems,
        mealplan: this.mealplan,
      },
      panelClass: 'print-dialog',
    });
  }

  getMonday(mondayMeals) {
    // Get Monday
    const mOneMealOneArr = mondayMeals.mOneMealOneArr;
    mOneMealOneArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mOneMealTwoArr = mondayMeals.mOneMealTwoArr;
    mOneMealTwoArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealOneArr = mondayMeals.mTwoMealOneArr;
    mTwoMealOneArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealTwoArr = mondayMeals.mTwoMealTwoArr;
    mTwoMealTwoArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealOneArr = mondayMeals.mThreeMealOneArr;
    mThreeMealOneArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealTwoArr = mondayMeals.mThreeMealTwoArr;
    mThreeMealTwoArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealOneArr = mondayMeals.mFourMealOneArr;
    mFourMealOneArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealTwoArr = mondayMeals.mFourMealTwoArr;
    mFourMealTwoArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealOneArr = mondayMeals.mFiveMealOneArr;
    mFiveMealOneArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealTwoArr = mondayMeals.mFiveMealTwoArr;
    mFiveMealTwoArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealOneArr = mondayMeals.mSixMealOneArr;
    mSixMealOneArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealTwoArr = mondayMeals.mSixMealTwoArr;
    mSixMealTwoArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealOneArr = mondayMeals.mSevenMealOneArr;
    mSevenMealOneArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealTwoArr = mondayMeals.mSevenMealTwoArr;
    mSevenMealTwoArr.forEach(a => {

      if (a.product) {this.foodArr.push(a); }
    });
  }

  getTuesday(tuesdayMeals) {
    // Get Monday
    const mOneMealOneArr = tuesdayMeals.mOneMealOneArr;
    mOneMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mOneMealTwoArr = tuesdayMeals.mOneMealTwoArr;
    mOneMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealOneArr = tuesdayMeals.mTwoMealOneArr;
    mTwoMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealTwoArr = tuesdayMeals.mTwoMealTwoArr;
    mTwoMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealOneArr = tuesdayMeals.mThreeMealOneArr;
    mThreeMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealTwoArr = tuesdayMeals.mThreeMealTwoArr;
    mThreeMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealOneArr = tuesdayMeals.mFourMealOneArr;
    mFourMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealTwoArr = tuesdayMeals.mFourMealTwoArr;
    mFourMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealOneArr = tuesdayMeals.mFiveMealOneArr;
    mFiveMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealTwoArr = tuesdayMeals.mFiveMealTwoArr;
    mFiveMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealOneArr = tuesdayMeals.mSixMealOneArr;
    mSixMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealTwoArr = tuesdayMeals.mSixMealTwoArr;
    mSixMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealOneArr = tuesdayMeals.mSevenMealOneArr;
    mSevenMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealTwoArr = tuesdayMeals.mSevenMealTwoArr;
    mSevenMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
  }

  getWednesday(wednesdayMeals) {
    // Get Monday
    const mOneMealOneArr = wednesdayMeals.mOneMealOneArr;
    mOneMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mOneMealTwoArr = wednesdayMeals.mOneMealTwoArr;
    mOneMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealOneArr = wednesdayMeals.mTwoMealOneArr;
    mTwoMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealTwoArr = wednesdayMeals.mTwoMealTwoArr;
    mTwoMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealOneArr = wednesdayMeals.mThreeMealOneArr;
    mThreeMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealTwoArr = wednesdayMeals.mThreeMealTwoArr;
    mThreeMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealOneArr = wednesdayMeals.mFourMealOneArr;
    mFourMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealTwoArr = wednesdayMeals.mFourMealTwoArr;
    mFourMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealOneArr = wednesdayMeals.mFiveMealOneArr;
    mFiveMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealTwoArr = wednesdayMeals.mFiveMealTwoArr;
    mFiveMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealOneArr = wednesdayMeals.mSixMealOneArr;
    mSixMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealTwoArr = wednesdayMeals.mSixMealTwoArr;
    mSixMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealOneArr = wednesdayMeals.mSevenMealOneArr;
    mSevenMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealTwoArr = wednesdayMeals.mSevenMealTwoArr;
    mSevenMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
  }

  getThursday(thursdayMeals) {
    // Get Monday
    const mOneMealOneArr = thursdayMeals.mOneMealOneArr;
    mOneMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mOneMealTwoArr = thursdayMeals.mOneMealTwoArr;
    mOneMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealOneArr = thursdayMeals.mTwoMealOneArr;
    mTwoMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealTwoArr = thursdayMeals.mTwoMealTwoArr;
    mTwoMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealOneArr = thursdayMeals.mThreeMealOneArr;
    mThreeMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealTwoArr = thursdayMeals.mThreeMealTwoArr;
    mThreeMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealOneArr = thursdayMeals.mFourMealOneArr;
    mFourMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealTwoArr = thursdayMeals.mFourMealTwoArr;
    mFourMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealOneArr = thursdayMeals.mFiveMealOneArr;
    mFiveMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealTwoArr = thursdayMeals.mFiveMealTwoArr;
    mFiveMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealOneArr = thursdayMeals.mSixMealOneArr;
    mSixMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealTwoArr = thursdayMeals.mSixMealTwoArr;
    mSixMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealOneArr = thursdayMeals.mSevenMealOneArr;
    mSevenMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealTwoArr = thursdayMeals.mSevenMealTwoArr;
    mSevenMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
  }

  getFriday(fridayMeals) {
    // Get Monday
    const mOneMealOneArr = fridayMeals.mOneMealOneArr;
    mOneMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mOneMealTwoArr = fridayMeals.mOneMealTwoArr;
    mOneMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealOneArr = fridayMeals.mTwoMealOneArr;
    mTwoMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mTwoMealTwoArr = fridayMeals.mTwoMealTwoArr;
    mTwoMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealOneArr = fridayMeals.mThreeMealOneArr;
    mThreeMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mThreeMealTwoArr = fridayMeals.mThreeMealTwoArr;
    mThreeMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealOneArr = fridayMeals.mFourMealOneArr;
    mFourMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFourMealTwoArr = fridayMeals.mFourMealTwoArr;
    mFourMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealOneArr = fridayMeals.mFiveMealOneArr;
    mFiveMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mFiveMealTwoArr = fridayMeals.mFiveMealTwoArr;
    mFiveMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealOneArr = fridayMeals.mSixMealOneArr;
    mSixMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSixMealTwoArr = fridayMeals.mSixMealTwoArr;
    mSixMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealOneArr = fridayMeals.mSevenMealOneArr;
    mSevenMealOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const mSevenMealTwoArr = fridayMeals.mSevenMealTwoArr;
    mSevenMealTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
  }

  getSupps(suppsMeals) {
    const beforeOneArr = suppsMeals.beforeOneArr;
    beforeOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const duringOneArr = suppsMeals.duringOneArr;
    duringOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const afterOneArr = suppsMeals.afterOneArr;
    afterOneArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const beforeTwoArr = suppsMeals.beforeTwoArr;
    beforeTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const duringTwoArr = suppsMeals.duringTwoArr;
    duringTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const afterTwoArr = suppsMeals.afterTwoArr;
    afterTwoArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const beforeThreeArr = suppsMeals.beforeThreeArr;
    beforeThreeArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const duringThreeArr = suppsMeals.duringThreeArr;
    duringThreeArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
    const afterThreeArr = suppsMeals.afterThreeArr;
    afterThreeArr.forEach(a => {
      if (a.product) {this.foodArr.push(a); }
    });
  }

  linkToChild() {
    const url = `dashboard/mealplans/${this.mealplan.mID}`;
    this.router.navigate([url]);
  }
}

