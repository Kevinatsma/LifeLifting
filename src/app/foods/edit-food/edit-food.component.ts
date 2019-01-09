import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../user/user.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FoodService } from './../food.service';
import { Observable } from 'rxjs';
import { Timezone } from 'src/app/shared/data/models/timezone.model';
import { DataService } from 'src/app/shared/data/data.service';
import { Location } from '@angular/common';
import { SpecialistService } from 'src/app/specialists/specialist.service';
import { Specialist } from 'src/app/specialists/specialist.model';
import { Food } from '../food.model';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./../food-detail/food-detail.component.scss', './edit-food.component.scss']
})
export class EditFoodComponent implements OnInit, OnDestroy {
  @Input() food: Food;
  aboutExtended = false;
  reviewsVisible = true;

  // Form
  editProductForm: FormGroup;


  constructor( private fb: FormBuilder,
               private foodService: FoodService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.editProductForm = this.fb.group({
      productName: '' || this.food.productName,
      productCategory: '' || this.food.productCategory,
      amount: '' || this.food.portion.amount,
      unit: '' || this.food.portion.unit,
      preperations: '' || this.food.preparations,
    });
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
      productCategory: this.editProductForm.get('productCategory').value || this.food.productCategory,
      portion: {
        amount: this.editProductForm.get('amount').value || this.food.portion.amount,
        unit: this.editProductForm.get('unit').value || this.food.portion.unit,
      }
      // preparations: this.editProductForm.get('preparations').value || this.food.preparations,
    };
    this.foodService.updateFood(this.food.productID, data);
    this.toggleEdit();
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
