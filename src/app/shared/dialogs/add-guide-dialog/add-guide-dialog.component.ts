import { Component, OnInit, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GuidelineService } from '../../../guidelines/guideline.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from './../../../user/user.model';
import { AuthService } from './../../../core/auth/auth.service';
import { UserService } from './../../../user/user.service';
import { Exercise } from './../../../exercises/exercise.model';
import { Observable } from 'rxjs';
import { ExerciseService } from './../../../exercises/exercise.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirstConsultation } from './../../../first-consultation/first-consultation.model';
import { UtilService } from '../../services/util.service';
import { Measurement } from './../../../measurement/measurement.model';
import { MeasurementService } from './../../../measurement/measurement.service';
import { FirstConsultationService } from './../../../first-consultation/first-consultation.service';
import { FormulaValues } from './../../../guidelines/guideline.model';

@Component({
  selector: 'app-add-guide-dialog',
  templateUrl: './add-guide-dialog.component.html',
  styleUrls: ['./add-guide-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddGuideDialogComponent implements OnInit {
  user: User;
  specialistID;
  hide = true;
  exercises: Exercise[];

  // FormGroups
  addGuidelineForm: FormGroup;
  infoForm: FormGroup;
  targetForm: FormGroup;
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

  calcForm: FormGroup;
  calculatedPerc: number;
  increase: boolean;
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

  activityForm: FormGroup;
  activityArr: FormArray;
  activityID = new FormControl('', Validators.required);
  activityDuration = new FormControl('', Validators.required);
  activityPerWeek = new FormControl('', Validators.required);
  activityLevel = new FormControl('', Validators.required);
  showAddActivity = true;
  activityLevels = [
    {
      value: 'beginner',
      viewValue: 'Beginner'
    },
    {
      value: 'intermediate',
      viewValue: 'Intermediate'
    },
    {
      value: 'professional',
      viewValue: 'Professional'
    },
  ]; selectedActivityLevel: string;

  macroForm: FormGroup;

  // formulas
  formulaValues: FormulaValues = {};
  measurements: any[];
  fics: any[];
  maxCaloriesResult: number;
  fatPercentageRegResult: number;
  fatPercentageAthResult: number;
  bmiResult: number;


  // Disable popup from closing
  @HostListener('window:keyup.esc') onKeyUp() {
    const cn = confirm('Are you sure you want to quit creating this guideline? Your progress will be lost.');
    if (cn) {
      this.dialogRef.close();
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
      event.returnValue = false;
  }

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private utils: UtilService,
               private exerciseService: ExerciseService,
               private guidelineService: GuidelineService,
               private measurementService: MeasurementService,
               private ficService: FirstConsultationService,
               public dialog: MatDialog,
               private dialogRef: MatDialogRef<AddGuideDialogComponent>,
               private afs: AngularFirestore,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.exerciseService.getExercises().subscribe(exercises => this.exercises = exercises);
                this.user = userData.user;
                this.getExtraDocs(userData.uid);
               }

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(_ => {
      const cn = confirm('Are you sure you want to quit creating this guideline? Your progress will be lost.');
      if (cn) {
        this.dialogRef.close();
      }
    });

    // Init forms
    this.infoForm = this.fb.group({
      gID: ['', Validators.required],
      guidelineName: ['', Validators.required],
      measurement: ['', Validators.required],
      firstConsultation: ['', Validators.required],
    });

    this.targetForm = this.fb.group({
      idealWeight: ['', Validators.required],
      idealKiloOfMuscle: [''],
      target: ['', Validators.required],
      totalTarget: ['', Validators.required],
      targetDuration: ['', Validators.required],
    });

    this.calcForm = this.fb.group({
      increaseCalories: ['', Validators.required],
      increaseAmount: ['', Validators.required],
      factorCalorie: ['', Validators.required],
    });

    this.activityForm = this.fb.group({
      activityArr: this.fb.array([ this.createActivity() ]),
    });

    this.macroForm = this.fb.group({
      proteinValue: ['', Validators.required],
      carbValue: ['', Validators.required],
      fatValue: ['', Validators.required],
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });

    this.userService.getUserDataByID(this.userData.uid).subscribe(user => {
      this.user = user;
    });
  }

  // Getters

  getExtraDocs(uid) {
    const measurementRef = this.afs.collection<Measurement>('measurements', ref =>
      ref.where('clientID', '==', `${uid}`)
      .orderBy('created', 'desc'))
      .valueChanges();
    measurementRef.subscribe(measurements => {
      this.measurements = measurements;
    });

    const ficRef = this.afs.collection<FirstConsultation>('first-consultations', ref =>
      ref.where('clientID', '==', `${uid}`)
      .orderBy('creationDate', 'desc'))
      .valueChanges();
    ficRef.subscribe(firstConsultations => {
      this.fics = firstConsultations;
    });
  }

  calculateCalories() {
    const factor = this.calcForm.get('factorCalorie').value;
    this.calculatedPerc = (factor * 100 - 100);
    if (this.calculatedPerc >= 1) {
      this.increase = true;
    } else {
      this.increase =  false;
    }
  }

  // Activity form
  get activityForms() {
    return this.activityForm.get('activityArr') as FormArray;
  }

  createActivity(): FormGroup {
    return this.fb.group({
      activityID: '',
      activityDuration: '',
      activityPerWeek: '',
      activityLevel: ''
    });
  }

  addActivity(): void {
    this.activityArr = this.activityForm.get('activityArr') as FormArray;
    this.activityArr.push(this.createActivity());
  }

  checkActivity(): void {
    if (this.activityArr.length < 3) {
      this.showAddActivity = true;
    } else {
      this.showAddActivity = false;
    }
  }

  deleteActivity(i) {
    (this.activityForm.get('activityArr') as FormArray).removeAt(i);
  }

  // Collect the data and send to service
  addGuideline() {
    this.runFormulas();

    setTimeout(() => {
      const data = {
        clientID: this.userData.uid,
        specialistID: this.specialistID,
        creationDate: new Date(),
        guidelineNR: this.infoForm.get('gID').value,
        guidelineName: this.infoForm.get('guidelineName').value,
        ficID: this.infoForm.get('firstConsultation').value.ficID,
        measurementID: this.infoForm.get('measurement').value.measurementID,
        idealWeight: this.targetForm.get('idealWeight').value,
        idealKiloOfMuscle: this.targetForm.get('idealKiloOfMuscle').value,
        target: this.targetForm.get('target').value,
        totalTarget: this.targetForm.get('totalTarget').value,
        targetDuration: this.targetForm.get('targetDuration').value,
        increaseCalories: this.calcForm.get('increaseCalories').value,
        increaseAmount: this.calcForm.get('increaseAmount').value,
        factorCalorie: this.calcForm.get('factorCalorie').value,
        activities: this.activityForms.value,
        macroDistribution: {
          proteinValue: this.macroForm.get('proteinValue').value,
          carbValue: this.macroForm.get('carbValue').value,
          fatValue: this.macroForm.get('fatValue').value
        },
        formulaData: {
          maxCalories: this.maxCaloriesResult,
          fatPercentageRegular: this.fatPercentageRegResult || null,
          fatPercentageAthlete: this.fatPercentageAthResult || null,
          bmi: this.bmiResult,
          weight: this.formulaValues.weight
        }
      };
      this.guidelineService.addGuideline(data);
    }, 1200);
  }

  closeDialog() {
    if (confirm(`Are you sure you want to stop creating this guideline?`)) {
      this.dialog.closeAll();
    }
  }


  // Formulas to calculate bmi and such

  runFormulas() {
    this.getFormulaValues();

    setTimeout(() => {
      const data = this.formulaValues;

      this.maxCaloriesResult = this.utils.calculateMaxCalories(data.weight, data.height, data.age, data.gender);

      if (!data.isAthlete) {
        this.fatPercentageRegResult = this.utils.calculateFatPercentageRegular(data);
      } else {
        this.fatPercentageAthResult = this.utils.calculateFatPercentageAthlete(data);
      }

      this.bmiResult = this.utils.calculateBMI(data.weight, data.height);
    }, 1000);
  }

  getFormulaValues() {
    const measurementDoc = this.afs.doc<Measurement>(`measurements/${this.infoForm.get('measurement').value.measurementID}`);
    const ficDoc = this.afs.doc<FirstConsultation>(`first-consultations/${this.infoForm.get('firstConsultation').value.ficID}`);
    this.formulaValues.factorCalorie = this.calcForm.get('factorCalorie').value;

    measurementDoc.valueChanges().subscribe(measurement => {
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
    ficDoc.valueChanges().subscribe(doc => {
      this.formulaValues.height = doc.basicData.height;
      this.formulaValues.age = this.utils.getAge(doc.basicData.birthDate.toDate());
      this.formulaValues.gender = doc.basicData.sex;
    });
  }

}
