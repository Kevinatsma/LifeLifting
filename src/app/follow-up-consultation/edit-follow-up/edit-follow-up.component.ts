import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FollowUpConsultationService } from '../follow-up-consultation.service';
import { Mealplan } from '../../mealplans/mealplan.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { FollowUpConsultation } from '../follow-up-consultation.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-follow-up',
  templateUrl: './edit-follow-up.component.html',
  styleUrls: ['./edit-follow-up.component.scss', './../add-follow-up/add-follow-up.component.scss']
})
export class EditFollowUpComponent implements OnInit, OnDestroy {
  client: User;
  followUp: FollowUpConsultation;
  mealplans: Mealplan[];
  mealplans$: Subscription;
  mealplansCol: AngularFirestoreCollection<Mealplan>;

  // Form
  followUpForm: FormGroup;
  dietFollowPercentage: number;

  // Booleans
  hasMealplans = false;


  // Disable popup from closing
  @HostListener('window:keyup.esc') onKeyUp() {
    event.preventDefault();
    if (confirm('Are you sure you want to quit editing this follow-up consultation? Your progress will be lost.')) {
      this.dialog.closeAll();
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
      event.returnValue = false;
  }

  constructor( private afs: AngularFirestore,
               private fb: FormBuilder,
               private followUpService: FollowUpConsultationService,
               public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
     this.client = data.client;
     this.followUp = data.followUp;
     this.getMealplans(data.client);
     this.dietFollowPercentage = data.followUp.dietFollowPercentage;
  }

  ngOnInit() {
    this.followUpForm = this.fb.group({
      mealplanID: [this.followUp.mealplanID, Validators.required],
      likeMost: [this.followUp.likeMost, Validators.required],
      likeLeast: [this.followUp.likeLeast, Validators.required],
      neverSeeAgain: [this.followUp.neverSeeAgain, Validators.required],
      mealplanPreferences: [this.followUp.mealplanPreferences, Validators.required],
      bowelMovementFrequency: [this.followUp.bowelMovementFrequency, Validators.required],
      sleepingHabits: [this.followUp.sleepingHabits, Validators.required],
      waterIntake: [this.followUp.waterIntake, Validators.required],
      frequency: [this.followUp.activities.frequency, Validators.required],
      activityType: [this.followUp.activities.activityType, Validators.required],
      changes: [this.followUp.activities.changes, Validators.required],
      supplementation: [this.followUp.activities.supplementation, Validators.required],
      mealsPerDay: [this.followUp.duringTheWeekend.mealsPerDay, Validators.required],
      sleepingSchedule: [this.followUp.duringTheWeekend.sleepingSchedule, Validators.required],
      eatingOutside: [this.followUp.duringTheWeekend.eatingOutside, Validators.required],
      cheatMeals: [this.followUp.duringTheWeekend.cheatMeals, Validators.required],
      portionSizes: [this.followUp.portionSizes, Validators.required],
      hungry: [this.followUp.hungry, Validators.required],
      preperationTrouble: [this.followUp.preperationTrouble, Validators.required],
      howYouFeeling: [this.followUp.howYouFeeling, Validators.required],
      questions: [this.followUp.questions, Validators.required],
      specialistNotes: [this.followUp.specialistNotes]
    });
  }

  ngOnDestroy() {
    this.mealplans$.unsubscribe();
  }

  // Getters
  getMealplans(client) {
    this.mealplansCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${client.uid}`));
    this.mealplans$ = this.mealplansCol.valueChanges().subscribe(mealplans => {
      if (mealplans.length > 0) {
        this.hasMealplans = true;
      }
      this.mealplans = mealplans;
    });
  }

  editFollowUpConsultation() {
    const id = this.followUp.fucID;

    const data = {
      clientID: this.client.uid,
      specialistID: this.client.specialist,
      mealplanID: this.followUpForm.get('mealplanID').value,
      edited: new Date(),
      dietFollowPercentage: this.dietFollowPercentage,
      likeMost: this.followUpForm.get('likeMost').value,
      likeLeast: this.followUpForm.get('likeLeast').value,
      neverSeeAgain: this.followUpForm.get('neverSeeAgain').value,
      mealplanPreferences: this.followUpForm.get('mealplanPreferences').value,
      bowelMovementFrequency: this.followUpForm.get('bowelMovementFrequency').value,
      sleepingHabits: this.followUpForm.get('sleepingHabits').value,
      waterIntake: this.followUpForm.get('waterIntake').value,
      activities: {
        frequency: this.followUpForm.get('frequency').value,
        activityType: this.followUpForm.get('activityType').value,
        changes: this.followUpForm.get('changes').value,
        supplementation: this.followUpForm.get('supplementation').value,
      },
      duringTheWeekend: {
          mealsPerDay: this.followUpForm.get('mealsPerDay').value,
          sleepingSchedule: this.followUpForm.get('sleepingSchedule').value,
          eatingOutside: this.followUpForm.get('eatingOutside').value,
          cheatMeals: this.followUpForm.get('cheatMeals').value,
      },
      portionSizes: this.followUpForm.get('portionSizes').value,
      hungry: this.followUpForm.get('hungry').value,
      preperationTrouble: this.followUpForm.get('preperationTrouble').value,
      howYouFeeling: this.followUpForm.get('howYouFeeling').value,
      questions: this.followUpForm.get('questions').value,
      specialistNotes: this.followUpForm.get('specialistNotes').value
    };

    this.followUpService.updateFollowUpConsultation(id, data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop editing this follow-up consultation?')) {
      this.dialog.closeAll();
    }
  }

}
