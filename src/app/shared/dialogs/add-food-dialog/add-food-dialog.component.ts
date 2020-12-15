import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FoodService } from './../../../foods/food.service';

import preperations from './../../data/JSON/preperations.json';
import mealTimes from './../../data/JSON/mealTimes.json';
import units from './../../data/JSON/units.json';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { nutritionTypes } from './../../../foods/food.model';

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddFoodDialogComponent implements OnInit {
  hide = true;
  // FormGroups
  addFoodForm: FormGroup;
  infoForm: FormGroup;
  categoryForm: FormGroup;
  prepForm: FormGroup;
  unitForm: FormGroup;

  downloadURL: string | null;
  prepArr: FormArray;
  prepValue = new FormControl('', [Validators.required]);
  mealTimeArr: FormArray;
  mealTimeValue = new FormControl('', [Validators.required]);
  mealTimes = mealTimes.mealTimes;
  units = units.units;
  nutritionTypes = nutritionTypes;
  preperations = preperations.preperations;

  // Calculative vars
  showShoppingUnit = false;
  shoppingUnit: string;

  constructor( private fb: FormBuilder,
               private foodService: FoodService,
               public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public foods: any) {
                 setTimeout(() => this.patchFoodNumber(this.foods.foods), 500);
               }

  ngOnInit() {
    this.infoForm = this.fb.group({
      productNumber: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      shoppingListName: ['', [Validators.required]],
    });

    this.categoryForm = this.fb.group({
      nutritionType: ['', [Validators.required]],
      mealTimeArr: this.fb.array([ this.createMealTime() ]),
    });

    this.prepForm = this.fb.group({
      prepArr: this.fb.array([ this.createPrep() ]),
    });

    this.unitForm = this.fb.group({
      unit: ['', [Validators.required]],
      shoppingUnit: [''],
      factor: ['', [Validators.required]],
    });
  }

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }

  patchFoodNumber(foods) {
    const foodNumber =  foods.length + 1;
    this.infoForm.get('productNumber').patchValue(`${foodNumber}`);
  }

  // Getters
  get prepForms() {
    return this.prepForm.get('prepArr') as FormArray;
  }

  get mealTimeForms() {
    return this.categoryForm.get('mealTimeArr') as FormArray;
  }

  // Create a new prep Mat Card
  createPrep(): FormGroup {
    return this.fb.group({
      prepValue: ''
    });
  }

  addPrep(): void {
    this.prepArr = this.prepForm.get('prepArr') as FormArray;
    this.prepArr.push(this.createPrep());
  }

  deletePrep(i) {
    (this.prepForm.get('prepArr') as FormArray).removeAt(i);
  }

  // Create a new mealtime array item
  createMealTime(): FormGroup {
    return this.fb.group({
      mealTimeValue: ''
    });
  }

  addMealTime(): void {
    this.mealTimeArr = this.categoryForm.get('mealTimeArr') as FormArray;
    this.mealTimeArr.push(this.createMealTime());
  }

  deleteMealTime(i) {
    (this.categoryForm.get('mealTimeArr') as FormArray).removeAt(i);
  }

  addFood() {
    const data = {
      productID: this.infoForm.get('productNumber').value,
      productName: this.infoForm.get('productName').value,
      shoppingListName: this.infoForm.get('shoppingListName').value,
      productPhoto: this.downloadURL,
      categories: {
          nutritionType: this.categoryForm.get('nutritionType').value,
          productMealTimes: this.mealTimeForms.value
      },
      unit: this.unitForm.get('unit').value,
      shoppingUnit: this.shoppingUnit || this.unitForm.get('shoppingUnit').value,
      factor: this.unitForm.get('factor').value,
      preperations: this.prepForms.value,
    };
    this.foodService.addFood(data);
  }

  // Update on unit change
  updateUnit() {
    const unit = this.unitForm.get('unit').value;
    switch (unit) {
      case 'Unit':
        this.shoppingUnit = 'unit';
        this.showShoppingUnit = true;
        this.unitForm.get('factor').setValue(1);
        this.unitForm.get('shoppingUnit').reset();
        break;
      case 'Fillet':
        this.shoppingUnit = 'gram';
        this.showShoppingUnit = false;
        this.unitForm.get('factor').setValue(150);
        this.unitForm.get('shoppingUnit').reset();
        break;
      case 'Glass':
        this.shoppingUnit = 'Milliliter';
        this.showShoppingUnit = false;
        this.unitForm.get('factor').setValue(250);
        this.unitForm.get('shoppingUnit').reset();
        break;
      case 'Cup':
        this.shoppingUnit = '';
        this.showShoppingUnit = true;
        this.unitForm.get('factor').setValue(240);
        this.unitForm.get('shoppingUnit').setValue('Milliliter');
        break;
      default:
        this.shoppingUnit = '';
        this.showShoppingUnit = true;
    }
  }


  closeDialog() {
    if (confirm('Are you sure you want to stop adding this product?')) {
      this.dialog.closeAll();
    }
  }
}
