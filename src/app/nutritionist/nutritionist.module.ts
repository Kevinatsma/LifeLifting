import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNutritionistComponent } from './add-nutritionist/add-nutritionist.component';
import { NutritionistItemComponent } from './nutritionist-item/nutritionist-item.component';
import { NutritionistService } from './nutritionist.service';
import { NutritionistsComponent } from './nutritionists/nutritionists.component';

@NgModule({
  declarations: [
    AddNutritionistComponent,
    NutritionistItemComponent,
    NutritionistsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AddNutritionistComponent,
    NutritionistItemComponent,
    NutritionistsComponent
  ],
  providers: [
    NutritionistService
  ]
})
export class NutritionistModule { }
