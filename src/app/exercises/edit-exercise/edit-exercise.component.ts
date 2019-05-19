import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from '../exercise.service';
import { Location } from '@angular/common';
import { SpecialistService } from '../../specialists/specialist.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: [
    './../exercise-detail/exercise-detail.component.scss',
    './../exercise-list-item/exercise-list-item.component.scss',
    './edit-exercise.component.scss'
  ]
})
export class EditExerciseComponent implements OnInit, OnDestroy {
  @Input() exercise: Exercise;
  aboutExtended = false;
  reviewsVisible = true;

  // Form
  editExerciseForm: FormGroup;
  downloadURL: string | null;
  url: any;

  constructor( private fb: FormBuilder,
               private exerciseService: ExerciseService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.editExerciseForm = this.fb.group({
      exerciseName: '' || this.exercise.exerciseName,
      categories: '' || this.exercise.categories,
      metsValue: '' || this.exercise.metsValue,
    });
    this.url = `exercises`;
  }

  // Getters

  get editShow(): boolean {
    return this.exerciseService.editShow;
  }

  toggleEdit() {
      this.exerciseService.toggleEdit();
  }

  ngOnDestroy() {
    this.exerciseService.editShow = false;
  }

  editExercise() {
    const data = {
      exerciseName: this.editExerciseForm.get('exerciseName').value || this.exercise.exerciseName,
      metsValue: this.editExerciseForm.get('metsValue').value || this.exercise.metsValue,
      exercisePhoto: this.downloadURL || this.exercise.exercisePhoto
    };
    this.exerciseService.updateExercise(this.exercise.exerciseID, data);
    this.toggleEdit();
  }

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
