import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { User } from './../../user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FollowUpConsultationService } from '../follow-up-consultation.service';
import { Mealplan } from './../../mealplans/mealplan.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-follow-up',
  templateUrl: './add-follow-up.component.html',
  styleUrls: ['./add-follow-up.component.scss']
})
export class AddFollowUpComponent implements OnInit, OnDestroy {
  client: User;
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
    if (confirm('Are you sure you want to quit creating this follow-up consultation? Your progress will be lost.')) {
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
     this.getMealplans(data.client);
  }

  ngOnInit() {
    this.followUpForm = this.fb.group({
      mealplanID: ['', Validators.required],
      likeMost: ['', Validators.required],
      likeLeast: ['', Validators.required],
      neverSeeAgain: ['', Validators.required],
      mealplanPreferences: ['', Validators.required],
      bowelMovementFrequency: ['', Validators.required],
      sleepingHabits: ['', Validators.required],
      waterIntake: ['', Validators.required],
      frequency: ['', Validators.required],
      activityType: ['', Validators.required],
      changes: ['', Validators.required],
      supplementation: ['', Validators.required],
      mealsPerDay: ['', Validators.required],
      sleepingSchedule: ['', Validators.required],
      eatingOutside: ['', Validators.required],
      cheatMeals: ['', Validators.required],
      portionSizes: ['', Validators.required],
      hungry: ['', Validators.required],
      preperationTrouble: ['', Validators.required],
      howYouFeeling: ['', Validators.required],
      questions: ['', Validators.required],
      specialistNotes: ['']
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

  addFollowUpConsultation() {
    const data = {
      clientID: this.client.uid,
      specialistID: this.client.specialist,
      mealplanID: this.followUpForm.get('mealplanID').value,
      creationDate: new Date(),
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

    this.followUpService.addFollowUpConsultation(data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop creating this follow-up consultation?')) {
      this.dialog.closeAll();
    }
  }

  getFormButtonDisabled(): boolean {
    return !this.followUpForm.valid
  }
}
