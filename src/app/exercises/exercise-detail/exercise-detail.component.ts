import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { Specialist } from '../../specialists/specialist.model';
import { SpecialistService } from '../../specialists/specialist.service';
import { Exercise } from '../exercise.model';


@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss', './../exercise-list-item/exercise-list-item.component.scss']
})
export class ExerciseDetailComponent implements OnInit {
  exercise: Exercise;
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;


  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef,
               public router: Router,
               public route: ActivatedRoute,
               public exerciseService: ExerciseService,
               public specialistService: SpecialistService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getExercise();
  }

  getExercise() {
    const id = this.route.snapshot.paramMap.get('id');
    this.exerciseService.getExerciseData(id).subscribe(exercise => (this.exercise = exercise));
  }

  aboutExtendedOpen() {
    this.aboutExtended = true;
    this.cdr.detectChanges();
  }

  aboutExtendedClose() {
    this.aboutExtended = false;
    this.cdr.detectChanges();
  }

  // Like this to avoid State Changed Error
  // Open/closers

  get editShow(): boolean {
    return this.exerciseService.editShow;
  }

  toggleEdit() {
    this.exerciseService.toggleEdit();
  }

  // Control buttons

  linkToPrevious(exercise) {
    const exerciseID = exercise.exerciseID - 1;
    const url = `dashboard/exercises/${exerciseID}`;
    this.router.navigate([url]);
    this.exerciseService.getExerciseData(exerciseID).subscribe(a => (this.exercise = a));
  }

  linkToNext(exercise) {
    const exerciseID = exercise.exerciseID + 1;
    const url = `dashboard/exercises/${exerciseID}`;
    this.router.navigate([url]);
    this.exerciseService.getExerciseData(exerciseID).subscribe(a => (this.exercise = a));
  }
}
