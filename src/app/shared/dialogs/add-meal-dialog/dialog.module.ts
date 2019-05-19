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
import { SuppsFormComponent } from './supps-form/supps-form.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    MondayFormComponent,
    TuesdayFormComponent,
    WednesdayFormComponent,
    ThursdayFormComponent,
    FridayFormComponent,
    SuppsFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    MondayFormComponent,
    TuesdayFormComponent,
    WednesdayFormComponent,
    ThursdayFormComponent,
    FridayFormComponent,
    SuppsFormComponent
  ],
  providers: [
    AddMealDialogService
  ]
})
export class DialogModule { }
