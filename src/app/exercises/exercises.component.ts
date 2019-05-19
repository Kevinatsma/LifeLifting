import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AddExerciseDialogComponent } from '../shared/dialogs/add-exercise-dialog/add-exercise-dialog.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  constructor( public location: Location,
               public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    // Set data for Dialog
    this.dialog.open(AddExerciseDialogComponent, {
      panelClass: 'add-exercise-dialog'
    });
  }

  goBack() {
    this.location.back();
  }
}
