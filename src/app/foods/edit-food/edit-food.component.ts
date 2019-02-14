import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FoodService } from './../food.service';
import { Location } from '@angular/common';
import { SpecialistService } from './../../specialists/specialist.service';
import { Food } from '../food.model';
import units from './../../shared/data/JSON/units.json';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: [
    './../food-detail/food-detail.component.scss',
    './../food-list-item/food-list-item.component.scss',
    './edit-food.component.scss'
  ]
})
export class EditFoodComponent implements OnInit, OnDestroy {
  @Input() food: Food;
  aboutExtended = false;
  reviewsVisible = true;

  // Form
  editProductForm: FormGroup;
  downloadURL: string | any;
  url: any;
  units = units.units;
  nutritionTypes =  [
    {value: 'Protein'},
    {value: 'Carbohydrates'},
    {value: 'Fat'}
  ];

  constructor( private fb: FormBuilder,
               private foodService: FoodService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.editProductForm = this.fb.group({
      productName: '' || this.food.productName,
      nutritionType: '' || this.food.categories.nutritionType,
      unit: '' || this.food.unit,
      preperations: '' || this.food.preparations,
    });
    this.url = `foods`;
  }

  // Getters

  get editShow(): boolean {
    return this.foodService.editShow;
  }

  toggleEdit() {
      this.foodService.toggleEdit();
  }

  ngOnDestroy() {
    this.foodService.editShow = false;
  }

  editProduct() {
    const data = {
      productName: this.editProductForm.get('productName').value || this.food.productName,
      categories: {
        nutritionType: this.editProductForm.get('nutritionType').value || this.food.categories.nutritionType,
        productMealTimes: this.food.categories.productMealTimes,
      },
      productPhoto: this.downloadURL || this.food.productPhoto
    };
    this.foodService.updateFood(this.food.productID, data);
    this.toggleEdit();
  }

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
