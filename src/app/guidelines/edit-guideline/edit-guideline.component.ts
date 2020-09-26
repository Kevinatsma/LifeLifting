import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuidelineService } from '../guideline.service';
import { Location } from '@angular/common';
import { SpecialistService } from '../../specialists/specialist.service';
import { Guideline, FormulaValues } from '../guideline.model';
import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../user/user.model';
import { Exercise } from './../../exercises/exercise.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilService } from './../../shared/services/util.service';
import { Measurement } from './../../measurement/measurement.model';
import { FirstConsultation } from './../../first-consultation/first-consultation.model';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

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
  fics: FirstConsultation[];
  measurements: Measurement[];
  measurement$: Subscription;
  fic$: Subscription;
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

  // Formula values
  formulaValues: FormulaValues = {};
  maxCaloriesResult: number;
  fatPercentageRegResult: number;
  fatPercentageAthResult: number;
  bmiResult: number;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private utils: UtilService,
               private afs: AngularFirestore,
               private guidelineService: GuidelineService,
               public specialistService: SpecialistService,
               public location: Location,
               public route: ActivatedRoute) {
                this.measurements = this.guidelineService.measurements;
                this.fics = this.guidelineService.fics;
                setTimeout(() => this.patchForm());
               }

  ngOnInit() {
    this.editGuidelineForm = this.fb.group({
      guidelineName: '' || this.guideline.guidelineName,
      measurement: '' || this.guideline.measurementID,
      firstConsultation: '' || this.guideline.ficID,
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

  ngOnDestroy() {
    if (this.fic$ !== undefined) { this.fic$.unsubscribe(); }
    if (this.measurement$ !== undefined) { this.measurement$.unsubscribe(); }
    this.guidelineService.editShow = false;
  }

  // Getters

  get editShow(): boolean {
    return this.guidelineService.editShow;
  }

  patchForm() {
    let measurementDoc: Measurement;
    if (this.measurements && this.measurements.length > 0) {
      measurementDoc = this.measurements.find(measurement => {
        return measurement.measurementID === `${this.guideline.measurementID}`;
      });
      this.editGuidelineForm.controls['measurement'].setValue(measurementDoc);
    }

    let ficDoc;
    if (this.fics && this.fics.length > 0) {
      ficDoc = this.fics.find(fic => {
        return fic.ficID === `${this.guideline.ficID}`;
      });
      this.editGuidelineForm.controls['firstConsultation'].setValue(ficDoc);
    }
  }

  toggleEdit() {
    this.guidelineService.toggleEdit();
  }

  toggleGainWeight() {
    if (this.selectedTarget === 'gain') {
      this.gainWeight = 'Gain';
    } else {
      this.gainWeight = 'Loss';
    }
  }

  editGuideline() {
    this.runFormulas();

    setTimeout(() => {
      let formulaData;
      formulaData = {
        maxCalories: this.maxCaloriesResult || this.guideline.formulaData.maxCalories,
        fatPercentageRegular: this.guideline.formulaData.fatPercentageRegular || 0,
        fatPercentageAthlete: this.guideline.formulaData.fatPercentageAthlete || 0,
        bmi: this.bmiResult || this.guideline.formulaData.bmi,
        weight: this.formulaValues.weight || 0
      };

      if (this.fatPercentageAthResult > 0) {
        formulaData.fatPercentageRegular = null;
        formulaData.fatPercentageAthlete = this.fatPercentageAthResult;
      } else {
        formulaData.fatPercentageRegular = this.fatPercentageRegResult;
        formulaData.fatPercentageAthlete = null;
      }

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
        ficID: this.editGuidelineForm.get('firstConsultation').value.ficID || this.guideline.ficID,
        measurementID: this.editGuidelineForm.get('measurement').value.measurementID || this.guideline.measurementID,
        macroDistribution: {
          proteinValue: this.editGuidelineForm.get('proteinValue').value || this.guideline.macroDistribution.proteinValue,
          carbValue: this.editGuidelineForm.get('carbValue').value || this.guideline.macroDistribution.carbValue,
          fatValue: this.editGuidelineForm.get('fatValue').value || this.guideline.macroDistribution.fatValue,
        },
        formulaData: formulaData
      };

      this.guidelineService.updateGuideline(this.guideline.gID, data);
      if (data.target === 'gain') {
        this.guidelineService.gainWeight = true;
      } else {
        this.guidelineService.gainWeight = false;
      }
      this.toggleEdit();
    }, 1200);
  }

  // Formulas to calculate bmi and such

  runFormulas() {
    this.getFormulaValues();

    setTimeout(() => {
      const data = this.formulaValues;
      const age = _.get(this.client, 'basicData.age');
      this.maxCaloriesResult = this.utils.calculateMaxCalories(data.weight, data.height, age, data.gender);
      if (!data.isAthlete) {
        this.fatPercentageRegResult = this.utils.calculateFatPercentageRegular(data);
      } else {
        this.fatPercentageAthResult = this.utils.calculateFatPercentageAthlete(data);
      }

      this.bmiResult = this.utils.calculateBMI(data.weight, data.height);
    }, 1000);
  }

  getFormulaValues() {
    const measurementDoc = this.afs.doc<Measurement>(`measurements/${this.editGuidelineForm.get('measurement').value.measurementID}`);
    const ficDoc = this.afs.doc<FirstConsultation>(`first-consultations/${this.editGuidelineForm.get('firstConsultation').value.ficID}`);
    this.formulaValues.factorCalorie = this.editGuidelineForm.get('factorCalorie').value;

    this.measurement$ = measurementDoc.valueChanges().subscribe(measurement => {
      if (measurement.weight) {
        this.formulaValues.weight = measurement.weight;
        this.formulaValues.triceps = measurement.skinfolds.triceps;
        this.formulaValues.biceps = measurement.skinfolds.biceps;
        this.formulaValues.subescapular = measurement.skinfolds.subescapular;
        this.formulaValues.crestaIliaca = measurement.skinfolds.crestaIliaca;
        if (measurement.skinfolds.skinfoldCalf && measurement.skinfolds.frontalThigh) {
          this.formulaValues.isAthlete = true;
        }
        this.formulaValues.calf = measurement.skinfolds.skinfoldCalf;
        this.formulaValues.frontalThigh = measurement.skinfolds.frontalThigh;
        this.formulaValues.abdominal = measurement.skinfolds.abdominal;
        this.formulaValues.supraespinal = measurement.skinfolds.supraespinal;
      }
    });
    this.fic$ = ficDoc.valueChanges().subscribe(doc => {
      this.formulaValues.height = doc.basicData.height;
      this.formulaValues.age = this.utils.getAge(doc.basicData.birthDate.toDate());
      this.formulaValues.gender = doc.basicData.sex;
    });
  }

  // Back Button

  goBack() {
    return this.location.back();
  }

}
