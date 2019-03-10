import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { MatDialogModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DataService } from './../data/data.service';
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';
import { AddPackageDialogComponent } from './add-package-dialog/add-package-dialog.component';
import { AddFoodDialogComponent } from './add-food-dialog/add-food-dialog.component';
import { AddExerciseDialogComponent } from './add-exercise-dialog/add-exercise-dialog.component';
import { AddMealDialogComponent } from './add-meal-dialog/add-meal-dialog.component';
import { AddGuideDialogComponent } from './add-guide-dialog/add-guide-dialog.component';
import { SharedModule } from '../shared.module';
import { AddSpecialistDialogComponent } from './add-specialist-dialog/add-specialist-dialog.component';
import { DialogModule } from './add-meal-dialog/dialog.module';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent,
    AddPackageDialogComponent,
    AddFoodDialogComponent,
    AddReviewDialogComponent,
    AddExerciseDialogComponent,
    AddMealDialogComponent,
    AddGuideDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    SharedModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [
    ConfirmDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent,
    AddPackageDialogComponent,
    AddFoodDialogComponent,
    AddReviewDialogComponent,
    AddExerciseDialogComponent,
    AddMealDialogComponent,
    AddGuideDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AddSpecialistDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent,
    AddPackageDialogComponent,
    AddFoodDialogComponent,
    AddReviewDialogComponent,
    AddExerciseDialogComponent,
    AddMealDialogComponent,
    AddGuideDialogComponent
  ],
  providers: [
    DataService
  ]
})
export class DialogsModule { }
