import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstConsultationService } from '../first-consultation.service';
import { Mealplan } from '../../mealplans/mealplan.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-first-consultation',
  templateUrl: './add-first-consultation.component.html',
  styleUrls: ['./add-first-consultation.component.scss']
})
export class AddFirstConsultationComponent implements OnInit {
  client: User;
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
    if (confirm('Are you sure you want to quit creating this first-consultation consultation? Your progress will be lost.')) {
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
     this.getMealplans(data.client);
  }

  ngOnInit() {
    this.firstConsultationForm = this.fb.group({
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

  addFirstConsultation() {
    const data = {
      clientID: this.client.uid,
      specialistID: this.client.specialist,
      mealplanID: this.firstConsultationForm.get('mealplanID').value,
      creationDate: new Date(),
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

    this.firstConsultationService.addFirstConsultation(data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop creating this first-consultation consultation?')) {
      this.dialog.closeAll();
    }
  }

}
