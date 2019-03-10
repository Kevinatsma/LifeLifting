import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsModule } from './../foods/foods.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MealplanListItemComponent } from './mealplan-list-item/mealplan-list-item.component';
import { MealplanListComponent } from '../mealplans/mealplan-list/mealplan-list.component';
import { EditMealplanComponent } from '../mealplans/edit-mealplan/edit-mealplan.component';

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

@NgModule({
  declarations: [
    MealplanListItemComponent,
    MealplanListComponent,
    EditMealplanComponent,
    MealplansComponent,
    MondayComponent,
    TuesdayComponent,
    WednesdayComponent,
    ThursdayComponent,
    FridayComponent,
    MealplanDetailComponent,
    SuppsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FoodsModule,
    SharedModule
  ],
  exports: [
    MealplanListItemComponent,
    MealplanListComponent,
    EditMealplanComponent,
    MealplansComponent,
    MealplanDetailComponent
  ],
  providers: [
    MealplanService
  ]
})
export class MealplansModule { }
