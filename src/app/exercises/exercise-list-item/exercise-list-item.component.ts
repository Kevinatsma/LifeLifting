import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user.model';

@Component({
  selector: 'app-exercise-list-item',
  templateUrl: './exercise-list-item.component.html',
  styleUrls: ['./exercise-list-item.component.scss']
})
export class ExerciseListItemComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() i;
  user: User;
  detailOpen = false;

  constructor( private auth: AuthService,
               public userService: UserService,
               public router: Router,
               public dialog: MatDialog,
               private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
    });
  }

  deleteExerciseDialog(exercise) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        exerciseID: exercise.exerciseID,
        exerciseName: exercise.exerciseName,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
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
