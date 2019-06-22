import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstConsultationService } from '../first-consultation.service';
import { Mealplan } from '../../mealplans/mealplan.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { FirstConsultation } from '../first-consultation.model';

@Component({
  selector: 'app-edit-first-consultation',
  templateUrl: './edit-first-consultation.component.html',
  styleUrls: ['./edit-first-consultation.component.scss', './../add-first-consultation/add-first-consultation.component.scss']
})
export class EditFirstConsultationComponent implements OnInit {
  client: User;
  firstConsultation: FirstConsultation;
  mealplans: Mealplan[];
  mealplansCol: AngularFirestoreCollection<Mealplan>;

  // Form
  firstConsultationForm: FormGroup;
  dietFollowPercentage: number;

  // Booleans
  hasMealplans = false;


  // Disable popup from closing
  @HostListener('window:keyup.esc') onKeyUp() {
    event.preventDefault();
    if (confirm('Are you sure you want to quit editing this first-consultation consultation? Your progress will be lost.')) {
      this.dialog.closeAll();
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
      event.returnValue = false;
  }

  constructor( private afs: AngularFirestore,
               private fb: FormBuilder,
               private firstConsultationService: FirstConsultationService,
               public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
     this.client = data.client;
     this.firstConsultation = data.firstConsultation;
     this.getMealplans(data.client);
     this.dietFollowPercentage = data.firstConsultation.dietFollowPercentage;
  }

  ngOnInit() {
    this.firstConsultationForm = this.fb.group({
      mealplanID: [this.firstConsultation.mealplanID, Validators.required],
      likeMost: [this.firstConsultation.likeMost, Validators.required],
      likeLeast: [this.firstConsultation.likeLeast, Validators.required],
      neverSeeAgain: [this.firstConsultation.neverSeeAgain, Validators.required],
      mealplanPreferences: [this.firstConsultation.mealplanPreferences, Validators.required],
      bowelMovementFrequency: [this.firstConsultation.bowelMovementFrequency, Validators.required],
      sleepingHabits: [this.firstConsultation.sleepingHabits, Validators.required],
      waterIntake: [this.firstConsultation.waterIntake, Validators.required],
      frequency: [this.firstConsultation.activities.frequency, Validators.required],
      activityType: [this.firstConsultation.activities.activityType, Validators.required],
      changes: [this.firstConsultation.activities.changes, Validators.required],
      supplementation: [this.firstConsultation.activities.supplementation, Validators.required],
      mealsPerDay: [this.firstConsultation.duringTheWeekend.mealsPerDay, Validators.required],
      sleepingSchedule: [this.firstConsultation.duringTheWeekend.sleepingSchedule, Validators.required],
      eatingOutside: [this.firstConsultation.duringTheWeekend.eatingOutside, Validators.required],
      cheatMeals: [this.firstConsultation.duringTheWeekend.cheatMeals, Validators.required],
      portionSizes: [this.firstConsultation.portionSizes, Validators.required],
      hungry: [this.firstConsultation.hungry, Validators.required],
      preperationTrouble: [this.firstConsultation.preperationTrouble, Validators.required],
      howYouFeeling: [this.firstConsultation.howYouFeeling, Validators.required],
      questions: [this.firstConsultation.questions, Validators.required],
      specialistNotes: [this.firstConsultation.specialistNotes]
    });
  }

  // Getters
  getMealplans(client) {
    this.mealplansCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${client.uid}`));
    this.mealplansCol.valueChanges().subscribe(mealplans => {
      if (mealplans.length > 0) {
        this.hasMealplans = true;
      }
      this.mealplans = mealplans;
    });
  }

  editFirstConsultation() {
    const id = this.firstConsultation.fucID;

    const data = {
      clientID: this.client.uid,
      specialistID: this.client.specialist,
      mealplanID: this.firstConsultationForm.get('mealplanID').value,
      edited: new Date(),
      dietFollowPercentage: this.dietFollowPercentage,
      likeMost: this.firstConsultationForm.get('likeMost').value,
      likeLeast: this.firstConsultationForm.get('likeLeast').value,
      neverSeeAgain: this.firstConsultationForm.get('neverSeeAgain').value,
      mealplanPreferences: this.firstConsultationForm.get('mealplanPreferences').value,
      bowelMovementFrequency: this.firstConsultationForm.get('bowelMovementFrequency').value,
      sleepingHabits: this.firstConsultationForm.get('sleepingHabits').value,
      waterIntake: this.firstConsultationForm.get('waterIntake').value,
      activities: {
        frequency: this.firstConsultationForm.get('frequency').value,
        activityType: this.firstConsultationForm.get('activityType').value,
        changes: this.firstConsultationForm.get('changes').value,
        supplementation: this.firstConsultationForm.get('supplementation').value,
      },
      duringTheWeekend: {
          mealsPerDay: this.firstConsultationForm.get('mealsPerDay').value,
          sleepingSchedule: this.firstConsultationForm.get('sleepingSchedule').value,
          eatingOutside: this.firstConsultationForm.get('eatingOutside').value,
          cheatMeals: this.firstConsultationForm.get('cheatMeals').value,
      },
      portionSizes: this.firstConsultationForm.get('portionSizes').value,
      hungry: this.firstConsultationForm.get('hungry').value,
      preperationTrouble: this.firstConsultationForm.get('preperationTrouble').value,
      howYouFeeling: this.firstConsultationForm.get('howYouFeeling').value,
      questions: this.firstConsultationForm.get('questions').value,
      specialistNotes: this.firstConsultationForm.get('specialistNotes').value
    };

    this.firstConsultationService.updateFirstConsultation(id, data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop editing this first-consultation consultation?')) {
      this.dialog.closeAll();
    }
  }

}
