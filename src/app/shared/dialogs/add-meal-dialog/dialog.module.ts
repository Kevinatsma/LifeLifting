import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material.module';
import { MondayFormComponent } from './monday-form/monday-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMealDialogService } from './add-meal-dialog.service';

@NgModule({
  declarations: [
    MondayFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MondayFormComponent
  ],
  providers: [
    AddMealDialogService
  ]
})
export class DialogModule { }
