import { Location } from '@angular/common';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { User } from './../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../../user/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss', './../exercise-list-item/exercise-list-item.component.scss']
})
export class ExerciseDetailComponent implements OnInit, OnDestroy {
  user: User;
  user$: Subscription;
  exercise: Exercise;
  exercise$: Subscription;
  prevExercise$: Subscription;
  nextExercise$: Subscription;
  aboutExtended = false;
  reviewsVisible = true;

  constructor( public auth: AuthService,
               private cdr: ChangeDetectorRef,
               public router: Router,
               public route: ActivatedRoute,
               private userService: UserService,
               public exerciseService: ExerciseService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getExercise();
    this.getUser();
  }

  ngOnDestroy() {
    if (this.user$ !== null) { this.user$.unsubscribe(); }
    if (this.exercise$ !== null) { this.exercise$.unsubscribe(); }
    if (this.prevExercise$ !== null && this.prevExercise$ !== undefined) { this.prevExercise$.unsubscribe(); }
    if (this.nextExercise$ !== null && this.nextExercise$ !== undefined) { this.nextExercise$.unsubscribe(); }
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
    });
  }

  getExercise() {
    const id = this.route.snapshot.paramMap.get('id');
    this.exercise$ = this.exerciseService.getExerciseData(id).subscribe(exercise => (this.exercise = exercise));
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

  // Links
  goBack() {
    this.location.back();
  }

  // Control buttons
  linkToPrevious(exercise) {
    const exerciseID = exercise.exerciseID - 1;
    const url = `dashboard/exercises/${exerciseID}`;
    this.router.navigate([url]);
    this.prevExercise$ = this.exerciseService.getExerciseData(exerciseID).subscribe(a => (this.exercise = a));
  }

  linkToNext(exercise) {
    const exerciseID = exercise.exerciseID + 1;
    const url = `dashboard/exercises/${exerciseID}`;
    this.router.navigate([url]);
    this.nextExercise$ = this.exerciseService.getExerciseData(exerciseID).subscribe(a => (this.exercise = a));
  }
}
