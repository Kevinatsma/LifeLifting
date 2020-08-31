import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { EditMondayFormComponent } from './edit-monday-form/edit-monday-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMealDialogService } from './edit-meal-dialog.service';
import { EditThursdayFormComponent } from './edit-thursday-form/edit-thursday-form.component';
import { EditWednesdayFormComponent } from './edit-wednesday-form/edit-wednesday-form.component';
import { EditTuesdayFormComponent } from './edit-tuesday-form/edit-tuesday-form.component';
import { EditFridayFormComponent } from './edit-friday-form/edit-friday-form.component';
import { EditSuppsFormComponent } from './edit-supps-form/edit-supps-form.component';
import { SharedModule } from '../../shared.module';
import { EditMealDialogComponent } from './edit-meal-dialog.component';

@NgModule({
  declarations: [
    EditMealDialogComponent,
    EditMondayFormComponent,
    EditTuesdayFormComponent,
    EditWednesdayFormComponent,
    EditThursdayFormComponent,
    EditFridayFormComponent,
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
    EditMondayFormComponent,
    EditTuesdayFormComponent,
    EditWednesdayFormComponent,
    EditThursdayFormComponent,
    EditFridayFormComponent,
    EditSuppsFormComponent
  ],
  providers: [
    EditMealDialogService
  ]
})
export class EditMealDialogModule { }
