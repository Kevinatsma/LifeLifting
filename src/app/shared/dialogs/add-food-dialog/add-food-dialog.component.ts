import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FoodService } from './../../../foods/food.service';

import preperations from './../../data/JSON/preperations.json';
import mealTimes from './../../data/JSON/mealTimes.json';
import units from './../../data/JSON/units.json';

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss']
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
  nutritionTypes =  [
    {value: 'Protein'},
    {value: 'Carbohydrates'},
    {value: 'Fat'}
  ];
  preperations = preperations.preperations;

  constructor( private fb: FormBuilder,
               private foodService: FoodService) {}

  ngOnInit() {
    this.infoForm = this.fb.group({
      productID: ['', [Validators.required]],
      productName: ['', [Validators.required]],
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
    });
  }

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
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
      productID: this.infoForm.get('productID').value,
      productName: this.infoForm.get('productName').value,
      productPhoto: this.downloadURL,
      categories: {
          nutritionType: this.categoryForm.get('nutritionType').value,
          productMealTimes: this.mealTimeForms.value
      },
      unit: this.unitForm.get('unit').value,
      preperations: this.prepForms.value,
    };
    this.foodService.addFood(data);
  }
}
