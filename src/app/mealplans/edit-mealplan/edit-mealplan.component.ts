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
      idealWeight: '' || this.mealplan.idealWeight,
      totalTarget: '' || this.mealplan.totalTarget,
      idealKiloOfMuscle: '' || this.mealplan.idealKiloOfMuscle,
      mealplanDuration: '' || this.mealplan.totalTarget,
      increaseAmount: '' || this.mealplan.increaseAmount,
      factorCalorie: '' || this.mealplan.factorCalorie,
      proteinValue: '' || this.mealplan.macroDistribution.proteinValue,
      carbValue: '' || this.mealplan.macroDistribution.carbValue,
      fatValue: '' || this.mealplan.macroDistribution.fatValue,
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
      idealWeight: this.editMealplanForm.get('idealWeight').value || this.mealplan.idealWeight,
      totalTarget: this.editMealplanForm.get('totalTarget').value || this.mealplan.totalTarget,
      target: this.selectedTarget || this.mealplan.target,
      idealKiloOfMuscle: this.editMealplanForm.get('idealKiloOfMuscle').value || this.mealplan.idealKiloOfMuscle,
      mealplanDuration: this.editMealplanForm.get('mealplanDuration').value || this.mealplan.totalTarget,
      increaseAmount: this.editMealplanForm.get('increaseAmount').value || this.mealplan.increaseAmount,
      increaseCalories: this.selectedBasalValue || this.mealplan.increaseCalories,
      factorCalorie: this.editMealplanForm.get('factorCalorie').value || this.mealplan.factorCalorie,
      macroDistribution: {
        proteinValue: this.editMealplanForm.get('proteinValue').value || this.mealplan.macroDistribution.proteinValue,
        carbValue: this.editMealplanForm.get('carbValue').value || this.mealplan.macroDistribution.carbValue,
        fatValue: this.editMealplanForm.get('fatValue').value || this.mealplan.macroDistribution.fatValue,
      }
    };
    this.mealplanService.updateMealplan(this.mealplan.mealplanID, data);
    if (data.target === 'gain') {
      this.mealplanService.gainWeight = true;
    } else {
      this.mealplanService.gainWeight = false;
    }
    this.toggleEdit();
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
