import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { User } from '../../user/user.model';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../client.service';
import { Specialist } from './../../specialists/specialist.model';
import { SpecialistService } from './../../specialists/specialist.service';
import { ChatThreadService } from './../../chat/chat-thread.service';
import { Guideline } from './../../guidelines/guideline.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Mealplan } from './../../mealplans/mealplan.model';
import { Measurement } from './../../measurement/measurement.model';
import { FollowUpConsultation } from './../../follow-up-consultation/follow-up-consultation.model';
import { FirstConsultation } from './../../first-consultation/first-consultation.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss', './../../dashboard/specialist-dashboard/my-clients/my-clients.component.scss']
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  user: User;
  user$: Subscription;
  specialist: Specialist;
  specialist$: Subscription;
  guidelinesCol: AngularFirestoreCollection<Guideline>;
  guidelines: Guideline[];
  guidelines$: Subscription;
  mealplansCol: AngularFirestoreCollection<Mealplan>;
  mealplans: Mealplan[];
  mealplans$: Subscription;
  measurementCol: AngularFirestoreCollection<Measurement>;
  measurements: Measurement[];
  measurements$: Subscription;
  followUpCol: AngularFirestoreCollection<FollowUpConsultation>;
  followUps: FollowUpConsultation[];
  followUps$: Subscription;
  firstConsultationsCol: AngularFirestoreCollection<FirstConsultation>;
  firstConsultations: FirstConsultation[];
  firstConsultations$: Subscription;
  aboutExtended = false;
  reviewsVisible = true;
  hasReadMore = false;
  hasGuidelines = false;
  hasMealplans = false;

  constructor( private afs: AngularFirestore,
               private cdr: ChangeDetectorRef,
               public route: ActivatedRoute,
               public clientService: ClientService,
               public specialistService: SpecialistService,
               public threadService: ChatThreadService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
    this.guidelines$.unsubscribe();
    this.measurements$.unsubscribe();
    this.mealplans$.unsubscribe();
    this.followUps$.unsubscribe();
    this.firstConsultations$.unsubscribe();
  }

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user$ = this.clientService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      const sID  = this.user.specialist;
      this.getSpecialist(sID);
      this.getGuidelines(user.uid);
      this.getMealplans(user.uid);
      this.getMeasurements(user.uid);
      this.getFollowUps(user.uid);
      this.getFirstConsultations(user.uid);
      this.checkReadMore(user);
    });
  }

  getSpecialist(sID: string) {
    this.specialist$ = this.specialistService.getSpecialistData(sID).subscribe(specialist => this.specialist =  specialist);
  }

  getGuidelines(uid) {
    this.guidelinesCol = this.afs.collection('guidelines', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('creationDate', 'desc'));
    this.guidelines$ = this.guidelinesCol.valueChanges().subscribe(guidelines => {
      if (guidelines.length > 0) {
        this.hasGuidelines = true;
      }
      this.guidelines = guidelines;
    });
  }

  getMealplans(uid) {
    this.mealplansCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('creationDate', 'desc'));
    this.mealplans$ = this.mealplansCol.valueChanges().subscribe(mealplans => {
      if (mealplans.length > 0) {
        this.hasMealplans = true;
      }
      this.mealplans = mealplans;
    });
  }

  getFollowUps(uid) {
    this.followUpCol = this.afs.collection('follow-ups', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('creationDate', 'desc'));
    this.followUps$ = this.followUpCol.valueChanges().subscribe(followUps => {
      this.followUps = followUps;
    });
  }

  getFirstConsultations(uid) {
    this.firstConsultationsCol = this.afs.collection('first-consultations', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('creationDate', 'desc'));
    this.firstConsultations$ = this.firstConsultationsCol.valueChanges().subscribe(firstConsultations => {
      this.firstConsultations = firstConsultations;
    });
  }

  getMeasurements(uid) {
    this.measurementCol = this.afs.collection('measurements', ref => ref.where('clientID', '==', `${uid}`)
      .orderBy('created', 'desc'));
    this.measurements$ = this.measurementCol.valueChanges().subscribe(measurements => {
      this.measurements = measurements;
    });
  }

  // Checkers
  checkReadMore(user) {
    if (user.basicData.mainGoal.length > 100) {
      this.hasReadMore = true;
    } else {
      this.hasReadMore = false;
    }
  }

  aboutExtendedOpen() {
    this.aboutExtended = true;
    this.cdr.detectChanges();
  }

  aboutExtendedClose() {
    this.aboutExtended = false;
    this.cdr.detectChanges();
  }

  // Like this to avoid State Changed Error
  // Open/closers

  get editShow(): boolean {
    return this.clientService.editShow;
  }

  toggleEdit() {
    this.clientService.toggleEdit();
  }

  openReviews() {
    this.reviewsVisible = true;
    this.cdr.detectChanges();
  }

  closeReviews() {
    this.reviewsVisible = false;
    this.cdr.detectChanges();
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
