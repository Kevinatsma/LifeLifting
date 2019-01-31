import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GuidelineService } from '../../../guidelines/guideline.service';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from './../../../user/user.model';
import { AuthService } from './../../../core/auth/auth.service';
import { UserService } from './../../../user/user.service';
import { Exercise } from './../../../exercises/exercise.model';
import { Observable } from 'rxjs';
import { ExerciseService } from './../../../exercises/exercise.service';

@Component({
  selector: 'app-add-guide-dialog',
  templateUrl: './add-guide-dialog.component.html',
  styleUrls: ['./add-guide-dialog.component.scss']
})
export class AddGuideDialogComponent implements OnInit {
  user = User;
  specialistID;
  hide = true;
  exercises: Observable<Exercise[]>;

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
  macroArr: FormArray;
  percentage = new FormControl('', [Validators.required]);
  macroValue = new FormControl('', [Validators.required]);
  macroValues = [
    {
      value: 'protein',
      viewValue: 'Protein'
    },
    {
      value: 'fat',
      viewValue: 'Fat'
    },
    {
      value: 'carbohydrates',
      viewValue: 'Carbohydrates'
    },
  ]; selectedMacroValue: string;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private exerciseService: ExerciseService,
               private guidelineService: GuidelineService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.exercises = this.exerciseService.getExercises();
               }

  ngOnInit() {
    this.infoForm = this.fb.group({
      guidelineID: ['', [Validators.required]],
      guidelineName: ['', [Validators.required]],
    });

    this.targetForm = this.fb.group({
      idealWeight: ['', [Validators.required]],
      idealKiloOfMuscle: [''],
      target: ['', [Validators.required]],
      totalTarget: ['', [Validators.required]],
      targetDuration: ['', [Validators.required]],
    });

    this.calcForm = this.fb.group({
      increaseCalories: ['', [Validators.required]],
      increaseAmount: ['', [Validators.required]],
      factorCalorie: ['', [Validators.required]],
    });

    this.activityForm = this.fb.group({
      activity: ['', [Validators.required]],
      activityDuration: ['', [Validators.required]],
      activityPerWeek: ['', [Validators.required]],
      macroArr: this.fb.array([ this.createMacro() ]),
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
    });

    // this.userService.getUserDataByID(this.guideline.clientID).subscribe(user => this.client = user);
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


  // Macro form
  get macroForms() {
    return this.activityForm.get('macroArr') as FormArray;
  }

  createMacro(): FormGroup {
    return this.fb.group({
      percentage: '',
      macroValue: ''
    });
  }

  addMacro(): void {
    this.macroArr = this.activityForm.get('macroArr') as FormArray;
    this.macroArr.push(this.createMacro());
  }

  deleteMacro(i) {
    (this.activityForm.get('macroArr') as FormArray).removeAt(i);
  }

  addGuideline() {
    const gID: number =  this.infoForm.get('guidelineID').value;
    const data = {
      clientID: this.userData.uid,
      specialistID: this.specialistID,
      creationDate: new Date(),
      guidelineID: this.userData.uid + '_' + gID,
      guidelineNR: gID,
      guidelineName: this.infoForm.get('guidelineName').value,
      idealWeight: this.targetForm.get('idealWeight').value,
      idealKiloOfMuscle: this.targetForm.get('idealKiloOfMuscle').value,
      target: this.targetForm.get('target').value,
      totalTarget: this.targetForm.get('totalTarget').value,
      targetDuration: this.targetForm.get('targetDuration').value,
      increaseCalories: this.calcForm.get('increaseCalories').value,
      increaseAmount: this.calcForm.get('increaseAmount').value,
      factorCalorie: this.calcForm.get('factorCalorie').value,
      activity: this.activityForm.get('activity').value,
      activityDuration: this.activityForm.get('activityDuration').value,
      activityPerWeek: this.activityForm.get('activityPerWeek').value,
      macroDistribution: this.macroForms.value
    };
    this.guidelineService.addGuideline(data);
  }
}
