import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsModule } from './../foods/foods.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MealplanListItemComponent } from './mealplan-list-item/mealplan-list-item.component';
import { MealplanListComponent } from '../mealplans/mealplan-list/mealplan-list.component';

import { SharedModule } from '../shared/shared.module';
import { MealplanService } from './mealplan.service';
import { MealplansComponent } from './mealplans.component';
import { MealplanDetailComponent } from './mealplan-detail/mealplan-detail.component';
import { MondayComponent } from './mealplan-detail/monday/monday.component';
import { TuesdayComponent } from './mealplan-detail/tuesday/tuesday.component';
import { WednesdayComponent } from './mealplan-detail/wednesday/wednesday.component';
import { ThursdayComponent } from './mealplan-detail/thursday/thursday.component';
import { FridayComponent } from './mealplan-detail/friday/friday.component';
import { SuppsComponent } from './mealplan-detail/supps/supps.component';
import { PrintMealplanComponent } from './print-mealplan/print-mealplan.component';
import { PrintMealMondayComponent } from './print-mealplan/print-meal-monday/print-meal-monday.component';
import { PrintMealTuesdayComponent } from './print-mealplan/print-meal-tuesday/print-meal-tuesday.component';
import { PrintMealWednesdayComponent } from './print-mealplan/print-meal-wednesday/print-meal-wednesday.component';
import { PrintMealThursdayComponent } from './print-mealplan/print-meal-thursday/print-meal-thursday.component';
import { PrintMealFridayComponent } from './print-mealplan/print-meal-friday/print-meal-friday.component';
import { PrintSuppsComponent } from './print-mealplan/print-supps/print-supps.component';

@NgModule({
  declarations: [
    MealplanListItemComponent,
    MealplanListComponent,
    MealplansComponent,
    MondayComponent,
    TuesdayComponent,
    WednesdayComponent,
    ThursdayComponent,
    FridayComponent,
    MealplanDetailComponent,
    SuppsComponent,
    PrintMealplanComponent,
    PrintMealMondayComponent,
    PrintMealTuesdayComponent,
    PrintMealWednesdayComponent,
    PrintMealThursdayComponent,
    PrintMealFridayComponent,
    PrintSuppsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FoodsModule,
    SharedModule,
  ],
  exports: [
    MealplanListItemComponent,
    MealplanListComponent,
    MealplansComponent,
    MealplanDetailComponent,
    PrintMealplanComponent,
    PrintMealMondayComponent,
    PrintMealTuesdayComponent,
    PrintMealWednesdayComponent,
    PrintMealThursdayComponent,
    PrintMealFridayComponent,
  ],
  providers: [
    MealplanService
  ]
})
export class MealplansModule { }
