import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MealplanService } from '../mealplan.service';
import { Location } from '@angular/common';
import { SpecialistService } from '../../specialists/specialist.service';
import { Mealplan } from '../mealplan.model';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../user/user.model';
import { Exercise } from '../../exercises/exercise.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-mealplan',
  templateUrl: './edit-mealplan.component.html',
  styleUrls: [
    './../mealplan-detail/mealplan-detail.component.scss',
    './../mealplan-list-item/mealplan-list-item.component.scss',
    './edit-mealplan.component.scss'
  ]
})
export class EditMealplanComponent implements OnInit, OnDestroy {
  @Input() mealplan: Mealplan;
  @Input() client: User;
  @Input() exercise: Exercise;
  aboutExtended = false;
  reviewsVisible = true;
  increaseCals: boolean;
  gainWeight: string;

  // Form
  editMealplanForm: FormGroup;
  targets = [
    {
      value: 'gain',
      viewValue: 'Gain weight'
    },
    {
      value: 'lose',
      viewValue: 'Lose weight'
    },
  ]; selectedTarget: string;
  basalValues = [
    {
      value: 'increase',
      viewValue: 'Increase calories'
    },
    {
      value: 'decrease',
      viewValue: 'Decrease calories'
    },
  ]; selectedBasalValue: string;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private mealplanService: MealplanService,
               public specialistService: SpecialistService,
               public location: Location,
               public route: ActivatedRoute) {
               }

  ngOnInit() {
    this.editMealplanForm = this.fb.group({
      mealplanName: '' || this.mealplan.mealplanName,
    });
  }

  // Getters

  get editShow(): boolean {
    return this.mealplanService.editShow;
  }

  toggleEdit() {
      this.mealplanService.toggleEdit();
  }

  toggleGainWeight() {
    if (this.selectedTarget === 'gain') {
      this.gainWeight = 'Gain';
    } else {
      this.gainWeight = 'Loss';
    }
  }

  ngOnDestroy() {
    this.mealplanService.editShow = false;
  }

  editMealplan() {
    const data = {
      lastEdited: new Date(),
      mealplanName: this.editMealplanForm.get('mealplanName').value || this.mealplan.mealplanName,
    };
    this.mealplanService.updateMealplan(this.mealplan.mID, data);
    this.toggleEdit();
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
