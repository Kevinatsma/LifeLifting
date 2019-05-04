import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { MondayFormComponent } from './monday-form/monday-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMealDialogService } from './edit-meal-dialog.service';
import { ThursdayFormComponent } from './thursday-form/thursday-form.component';
import { WednesdayFormComponent } from './wednesday-form/wednesday-form.component';
import { TuesdayFormComponent } from './tuesday-form/tuesday-form.component';
import { FridayFormComponent } from './friday-form/friday-form.component';
import { EditSuppsFormComponent } from './edit-supps-form/edit-supps-form.component';
import { SharedModule } from '../../shared.module';
import { EditMealDialogComponent } from './edit-meal-dialog.component';

@NgModule({
  declarations: [
    EditMealDialogComponent,
    MondayFormComponent,
    TuesdayFormComponent,
    WednesdayFormComponent,
    ThursdayFormComponent,
    FridayFormComponent,
    EditSuppsFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    EditMealDialogComponent,
    MondayFormComponent,
    TuesdayFormComponent,
    WednesdayFormComponent,
    ThursdayFormComponent,
    FridayFormComponent,
    EditSuppsFormComponent
  ],
  providers: [
    EditMealDialogService
  ],
  entryComponents: [
    EditMealDialogComponent
  ]
})
export class EditMealDialogModule { }
