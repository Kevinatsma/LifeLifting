import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  @Input() exercises: Exercise[];

  constructor() { }

  ngOnInit() {
  }

}
