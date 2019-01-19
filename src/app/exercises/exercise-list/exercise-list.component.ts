import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  exercises: Observable<Exercise[]>;

  constructor( private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exercises = this.exerciseService.getExercises();
  }

}
