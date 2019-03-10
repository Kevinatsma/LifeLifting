import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FoodItemComponent } from './food-item/food-item.component';
import { FoodListItemComponent } from './food-list-item/food-list-item.component';
import { FoodListComponent } from '../foods/food-list/food-list.component';
import { EditFoodComponent } from '../foods/edit-food/edit-food.component';

import { SharedModule } from '../shared/shared.module';
import { FoodService } from './food.service';
import { FoodsComponent } from './foods.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';

@NgModule({
  declarations: [
    FoodItemComponent,
    FoodListItemComponent,
    FoodListComponent,
    EditFoodComponent,
    FoodsComponent,
    FoodDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FoodItemComponent,
    FoodListItemComponent,
    FoodListComponent,
    EditFoodComponent,
    FoodsComponent,
    FoodDetailComponent
  ],
  providers: [
    FoodService
  ]
})
export class FoodsModule { }
