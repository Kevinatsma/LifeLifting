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
  @Input() exercises;

  exerciseOne: Exercise;
  exerciseTwo: Exercise;
  exerciseThree: Exercise;

  constructor( private exerciseService: ExerciseService,
               private guidelineService: GuidelineService) { }

  ngOnInit() {

  }

  // Getters

}
