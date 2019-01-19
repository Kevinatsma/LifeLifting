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
  editProductForm: FormGroup;


  constructor( private fb: FormBuilder,
               private exerciseService: ExerciseService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.editProductForm = this.fb.group({
      exerciseName: '' || this.exercise.exerciseName,
      categories: '' || this.exercise.categories,
      amount: '' || this.exercise.portion.amount,
      unit: '' || this.exercise.portion.unit,
      preperations: '' || this.exercise.locations,
    });
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

  editProduct() {
    const data = {
      exerciseName: this.editProductForm.get('exerciseName').value || this.exercise.exerciseName,
      exerciseCategory: this.editProductForm.get('exerciseCategory').value || this.exercise.categories,
      portion: {
        amount: this.editProductForm.get('amount').value || this.exercise.portion.amount,
        unit: this.editProductForm.get('unit').value || this.exercise.portion.unit,
      }
      // preparations: this.editProductForm.get('preparations').value || this.exercise.preparations,
    };
    this.exerciseService.updateExercise(this.exercise.exerciseID, data);
    this.toggleEdit();
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
