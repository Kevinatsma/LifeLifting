import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseListComponent } from '../exercises/exercise-list/exercise-list.component';
import { EditExerciseComponent } from '../exercises/edit-exercise/edit-exercise.component';

import { SharedModule } from '../shared/shared.module';
import { ExerciseService } from './exercise.service';
import { ExercisesComponent } from './exercises.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { AddExerciseDialogComponent } from '../shared/dialogs/add-exercise-dialog/add-exercise-dialog.component';

@NgModule({
  declarations: [
    AddExerciseDialogComponent,
    ExerciseListComponent,
    EditExerciseComponent,
    ExercisesComponent,
    ExerciseDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AddExerciseDialogComponent,
    ExerciseListComponent,
    EditExerciseComponent,
    ExercisesComponent,
    ExerciseDetailComponent
  ],
  providers: [
    ExerciseService
  ]
})
export class ExercisesModule { }
