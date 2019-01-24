import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-list-item',
  templateUrl: './exercise-list-item.component.html',
  styleUrls: ['./exercise-list-item.component.scss']
})
export class ExerciseListItemComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() i;
  detailOpen = false;

  constructor( public router: Router,
               public dialog: MatDialog,
               private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  deleteExerciseDialog(exercise) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        exerciseID: exercise.exerciseID,
        exerciseName: exercise.exerciseName,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        console.log('i"m being called');
        const id = exercise.exerciseID;
        this.exerciseService.deleteExercise(id);
      } else if (result === false) {
        return null;
      }
    });
  }

  editExercise(exercise) {
    const url = `dashboard/exercises/${exercise.exerciseID}`;
    this.router.navigate([url]);
    return this.exerciseService.editShow = true;
  }


  linkToChild(exercise) {
    const url = `dashboard/exercises/${exercise.exerciseID}`;
    this.router.navigate([url]);
  }

}
