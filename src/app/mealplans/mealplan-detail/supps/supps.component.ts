import { Component, OnInit, Input } from '@angular/core';
import { ExerciseService } from './../../../exercises/exercise.service';
import { GuidelineService } from './../../../guidelines/guideline.service';
import { Guideline } from './../../../guidelines/guideline.model';
import { Exercise } from './../../../exercises/exercise.model';

@Component({
  selector: 'app-supps',
  templateUrl: './supps.component.html',
  styleUrls: ['./supps.component.scss']
})
export class SuppsComponent implements OnInit {
  @Input() supps;

  exerciseOne: Exercise;
  exerciseTwo: Exercise;
  exerciseThree: Exercise;

  constructor( private exerciseService: ExerciseService,
               private guidelineService: GuidelineService) {
                setTimeout(() => {
                  this.exerciseOne = this.supps.exercises.exerciseOne;
                  this.exerciseTwo = this.supps.exercises.exerciseTwo;
                  this.exerciseThree = this.supps.exercises.exerciseThree;
                });
              }

  ngOnInit() {

  }

  // Getters

}
