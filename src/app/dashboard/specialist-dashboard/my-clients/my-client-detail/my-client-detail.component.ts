import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { User } from '../../../../user/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../user/user.service';
import { Specialist } from '../../../../specialists/specialist.model';
import { SpecialistService } from '../../../../specialists/specialist.service';
import { ChatThreadService } from '../../../../chat/chat-thread.service';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddMealDialogComponent } from '../../../../shared/dialogs/add-meal-dialog/add-meal-dialog.component';
import { AddGuideDialogComponent } from '../../../../shared/dialogs/add-guide-dialog/add-guide-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Guideline } from '../../../../guidelines/guideline.model';
import { Mealplan } from '../../../../mealplans/mealplan.model';
import { AddMeasurementComponent } from '../../../../measurement/add-measurement/add-measurement.component';
import { Measurement } from '../../../../measurement/measurement.model';
import { AddFollowUpComponent } from './../../../../follow-up-consultation/add-follow-up/add-follow-up.component';
import { AddFirstConsultationComponent } from './../../../../first-consultation/add-first-consultation/add-first-consultation.component';
import { FollowUpConsultation } from '../../../../follow-up-consultation/follow-up-consultation.model';
import { GuidelineService } from './../../../../guidelines/guideline.service';


@Component({
  selector: 'app-my-client-detail',
  templateUrl: './my-client-detail.component.html',
  styleUrls: ['./my-client-detail.component.scss']
})
export class MyClientDetailComponent implements OnInit, OnDestroy {
  user: User;
  user$: Subscription;
  specialist: Specialist;
  specialist$: Subscription;
  measurementCol: AngularFirestoreCollection<Measurement>;
  measurements: Measurement[];
  measurements$: Subscription;
  followUpCol: AngularFirestoreCollection<FollowUpConsultation>;
  followUps: FollowUpConsultation[];
  followUps$: Subscription;
  firstConsultationsCol: AngularFirestoreCollection<FollowUpConsultation>;
  firstConsultations: FollowUpConsultation[];
  firstConsultations$: Subscription;
  guidelinesCol: AngularFirestoreCollection<Guideline>;
  guidelines: Guideline[];
  mealplansCol: AngularFirestoreCollection<Mealplan>;
  mealplans$: Subscription;
  mealplans: Mealplan[];

  tooltipPosition = 'left';

  // Booleans
  reviewsVisible = true;
  actionMenuOpen: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();
  stateChange$: Subscription;
  aboutExtended = false;
  hasReadMore = false;
  hasGuidelines = false;
  hasMealplans = false;

  constructor( private afs: AngularFirestore,
               private cdr: ChangeDetectorRef,
               public route: ActivatedRoute,
               public userService: UserService,
               public specialistService: SpecialistService,
               public guidelineService: GuidelineService,
               public threadService: ChatThreadService,
               public location: Location,
               public dialog: MatDialog) {
    this.stateChange$ = this.editStateChange.subscribe((value) => {
      this.actionMenuOpen = value;
    });
  }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
    this.measurements$.unsubscribe();
    this.mealplans$.unsubscribe();
    this.stateChange$.unsubscribe();
    this.firstConsultations$.unsubscribe();
    this.followUps$.unsubscribe();
  }

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      const sID  = this.user.specialist;
      this.getSpecialist(sID);
      this.getGuidelines(user.uid);
      this.getMealplans(user.uid);
      this.getMeasurements(user.uid);
      this.getFirstConsultations(user.uid);
      this.getFollowUps(user.uid);
      if (user.basicData.age > 0) {
        this.checkReadMore(user);
      }
    });
  }

  getSpecialist(sID: string) {
    this.specialist$ = this.specialistService.getSpecialistData(sID).subscribe(specialist => (this.specialist = specialist));
  }

  getGuidelines(uid) {
    this.guidelinesCol = this.afs.collection('guidelines', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('creationDate', 'desc'));
    this.guidelinesCol.valueChanges().subscribe(guidelines => {
      this.guidelines = guidelines;
    });
  }

  getMealplans(uid) {
    this.mealplansCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('creationDate', 'desc'));
    this.mealplans$ = this.mealplansCol.valueChanges().subscribe(mealplans => this.mealplans = mealplans);
  }

  getMeasurements(uid) {
    this.measurementCol = this.afs.collection('measurements', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('created', 'desc'));
    this.measurements$ = this.measurementCol.valueChanges().subscribe(measurements => {
      this.measurements = measurements;
      this.guidelineService.updateMeasurements(measurements);
    });
  }

  getFirstConsultations(uid) {
    this.firstConsultationsCol = this.afs.collection('first-consultations', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('creationDate', 'desc'));
    this.firstConsultations$ = this.firstConsultationsCol.valueChanges().subscribe(firstConsultations => {
      this.firstConsultations = firstConsultations;
      this.guidelineService.updateFics(firstConsultations);
    });
  }

  getFollowUps(uid) {
    this.followUpCol = this.afs.collection('follow-ups', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('creationDate', 'desc'));
    this.followUps$ = this.followUpCol.valueChanges().subscribe(followUps => {
      this.followUps = followUps;
    });
  }

  // Checkers
  checkReadMore(user) {
    if (user.basicData.mainGoal.length > 50) {
      this.hasReadMore = true;
    } else {
      this.hasReadMore = false;
    }
  }

  // Like this to avoid State Changed Error
  // Open/closers
  aboutExtendedOpen() {
    this.aboutExtended = true;
    this.cdr.detectChanges();
  }

  aboutExtendedClose() {
    this.aboutExtended = false;
    this.cdr.detectChanges();
  }

  toggleButtonMenu() {
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(button => {
      button.classList.toggle('visible');
    });
    this.editStateChange.next(!this.actionMenuOpen);
  }

  openReviews() {
    this.reviewsVisible = true;
    this.cdr.detectChanges();
  }

  closeReviews() {
    this.reviewsVisible = false;
    this.cdr.detectChanges();
  }

  openMealDialog() {
    // Set data for Dialog
    const dialogRef = this.dialog.open(AddMealDialogComponent, {
        data: {
          uid: this.user.uid,
          displayName: this.user.displayName,
          currentWeight: this.user.basicData.currentWeight,
        },
        disableClose: true,
        panelClass: 'mealplan-dialog'
    });
  }

  openGuideDialog() {
    this.dialog.open(AddGuideDialogComponent, {
      data: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        currentWeight: this.user.basicData.currentWeight
      },
      panelClass: 'add-guide-dialog',
      disableClose: true,
    });
  }

  openMeasurementDialog() {
    this.dialog.open(AddMeasurementComponent, {
      data: {
        client: this.user,
        uid: this.user.uid,
        displayName: this.user.displayName,
        currentWeight: this.user.basicData.currentWeight
      },
      panelClass: 'add-measurement-dialog',
      disableClose: true
    });
  }

  openFirstConsultationDialog() {
    this.dialog.open(AddFirstConsultationComponent, {
      data: {
        client: this.user
      },
      panelClass: 'first-consultation-dialog'
    });
  }

  openFollowUpDialog() {
    this.dialog.open(AddFollowUpComponent, {
      data: {
        client: this.user
      },
      panelClass: 'follow-up-dialog'
    });
  }

  chat() {
    const profileId = this.user.uid;
    return this.threadService.createThread(profileId);
  }

  // Back Button

  goBack() {
    return this.location.back();
  }
}
