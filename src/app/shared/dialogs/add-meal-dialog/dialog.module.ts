import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material.module';
import { MondayFormComponent } from './monday-form/monday-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMealDialogService } from './add-meal-dialog.service';
import { ThursdayFormComponent } from './thursday-form/thursday-form.component';
import { WednesdayFormComponent } from './wednesday-form/wednesday-form.component';
import { TuesdayFormComponent } from './tuesday-form/tuesday-form.component';
import { FridayFormComponent } from './friday-form/friday-form.component';

@NgModule({
  declarations: [
    MondayFormComponent,
    TuesdayFormComponent,
    WednesdayFormComponent,
    ThursdayFormComponent,
    FridayFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MondayFormComponent,
    TuesdayFormComponent,
    WednesdayFormComponent,
    ThursdayFormComponent,
    FridayFormComponent
  ],
  providers: [
    AddMealDialogService
  ]
})
export class DialogModule { }
