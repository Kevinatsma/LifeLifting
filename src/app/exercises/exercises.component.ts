import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AddExerciseDialogComponent } from '../shared/dialogs/add-exercise-dialog/add-exercise-dialog.component';
import { Exercise } from './exercise.model';
import { ExerciseService } from './exercise.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exercises$: Subscription;
  searchExercises: Exercise[];
  searchActive = false;

  constructor( public location: Location,
               public cdr: ChangeDetectorRef,
               private exerciseService: ExerciseService,
               public dialog: MatDialog) { }

  ngOnInit() {
    this.exercises$ = this.exerciseService.getExercises().subscribe(exercises => this.exercises = exercises);
  }

  ngOnDestroy() {
    this.exercises$.unsubscribe();
  }

  openDialog() {
    // Set data for Dialog
    this.dialog.open(AddExerciseDialogComponent, {
      panelClass: 'add-exercise-dialog'
    });
  }

  onChangeSearch(e) {
    const searchInput = e.target.value.toLowerCase();

    // Show correct user list
    this.searchActive = e.target.value !== '';
    this.cdr.detectChanges();

    // Reset search array
    this.searchExercises = [];

    // Filter objects on display name and push matches to search array
    this.exercises.forEach(obj => {
      if (obj.exerciseName.toLowerCase().includes(`${searchInput}`)) {
        this.searchExercises.push(<Exercise>obj);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
