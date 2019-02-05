import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuidelineService } from '../guideline.service';
import { Location } from '@angular/common';
import { SpecialistService } from '../../specialists/specialist.service';
import { Guideline } from '../guideline.model';
import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../user/user.model';
import { Exercise } from './../../exercises/exercise.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-guideline',
  templateUrl: './edit-guideline.component.html',
  styleUrls: [
    './../guideline-detail/guideline-detail.component.scss',
    './../guideline-list-item/guideline-list-item.component.scss',
    './edit-guideline.component.scss'
  ]
})
export class EditGuidelineComponent implements OnInit, OnDestroy {
  @Input() guideline: Guideline;
  @Input() client: User;
  @Input() exercise: Exercise;
  aboutExtended = false;
  reviewsVisible = true;
  increaseCals: boolean;
  gainWeight: string;

  // Form
  editGuidelineForm: FormGroup;
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
               private guidelineService: GuidelineService,
               public specialistService: SpecialistService,
               public location: Location,
               public route: ActivatedRoute) {
               }

  ngOnInit() {
    this.editGuidelineForm = this.fb.group({
      guidelineName: '' || this.guideline.guidelineName,
      idealWeight: '' || this.guideline.idealWeight,
      totalTarget: '' || this.guideline.totalTarget,
      idealKiloOfMuscle: '' || this.guideline.idealKiloOfMuscle,
      guidelineDuration: '' || this.guideline.totalTarget,
      increaseAmount: '' || this.guideline.increaseAmount,
      factorCalorie: '' || this.guideline.factorCalorie,
      proteinValue: '' || this.guideline.macroDistribution.proteinValue,
      carbValue: '' || this.guideline.macroDistribution.carbValue,
      fatValue: '' || this.guideline.macroDistribution.fatValue,
    });
  }

  // Getters

  get editShow(): boolean {
    return this.guidelineService.editShow;
  }

  toggleEdit() {
      this.guidelineService.toggleEdit();
  }

  toggleGainWeight() {
    console.log(this.selectedTarget);
    if (this.selectedTarget === 'gain') {
      this.gainWeight = 'Gain';
    } else {
      this.gainWeight = 'Loss';
    }
  }

  ngOnDestroy() {
    this.guidelineService.editShow = false;
  }

  editGuideline() {
    const data = {
      lastEdited: new Date(),
      guidelineName: this.editGuidelineForm.get('guidelineName').value || this.guideline.guidelineName,
      idealWeight: this.editGuidelineForm.get('idealWeight').value || this.guideline.idealWeight,
      totalTarget: this.editGuidelineForm.get('totalTarget').value || this.guideline.totalTarget,
      target: this.selectedTarget || this.guideline.target,
      idealKiloOfMuscle: this.editGuidelineForm.get('idealKiloOfMuscle').value || this.guideline.idealKiloOfMuscle,
      guidelineDuration: this.editGuidelineForm.get('guidelineDuration').value || this.guideline.totalTarget,
      increaseAmount: this.editGuidelineForm.get('increaseAmount').value || this.guideline.increaseAmount,
      increaseCalories: this.selectedBasalValue || this.guideline.increaseCalories,
      factorCalorie: this.editGuidelineForm.get('factorCalorie').value || this.guideline.factorCalorie,
      macroDistribution: {
        proteinValue: this.editGuidelineForm.get('proteinValue').value || this.guideline.macroDistribution.proteinValue,
        carbValue: this.editGuidelineForm.get('carbValue').value || this.guideline.macroDistribution.carbValue,
        fatValue: this.editGuidelineForm.get('fatValue').value || this.guideline.macroDistribution.fatValue,
      }
    };
    this.guidelineService.updateGuideline(this.guideline.guidelineID, data);
    if (data.target === 'gain') {
      this.guidelineService.gainWeight = true;
    } else {
      this.guidelineService.gainWeight = false;
    }
    this.toggleEdit();
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
