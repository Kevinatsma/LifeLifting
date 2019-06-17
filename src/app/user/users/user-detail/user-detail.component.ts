import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { User } from './../../user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../user.service';
import { Specialist } from './../../../specialists/specialist.model';
import { SpecialistService } from './../../../specialists/specialist.service';
import { ChatThreadService } from './../../../chat/chat-thread.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Guideline } from './../../../guidelines/guideline.model';
import { Observable } from 'rxjs';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { AuthService } from './../../../core/auth/auth.service';
import { Measurement } from './../../../measurement/measurement.model';
import { FollowUpConsultation } from './../../../follow-up-consultation/follow-up-consultation.model';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  // specialist: Specialist;
  guidelinesCol: AngularFirestoreCollection<Guideline>;
  guidelines: Guideline[];
  mealplansCol: AngularFirestoreCollection<Mealplan>;
  mealplans: Mealplan[];
  measurementCol: AngularFirestoreCollection<Measurement>;
  measurements: Measurement[];
  followUpCol: AngularFirestoreCollection<FollowUpConsultation>;
  followUps: FollowUpConsultation[];
  hasMealplans = false;
  hasGuidelines = false;
  mealPlansActive = false;
  aboutExtended = false;
  reviewsVisible = true;
  hasReadMore = false;


  specialist: Specialist;

  constructor( private afs: AngularFirestore,
               public auth: AuthService,
               private cdr: ChangeDetectorRef,
               public route: ActivatedRoute,
               public userService: UserService,
               public specialistService: SpecialistService,
               public threadService: ChatThreadService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getUser();
  }

  // Getters

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      const uid = this.user.uid;
      const sID  = this.user.specialist;
      setTimeout(() => {
        this.getSpecialist(sID);
        this.getGuidelines(uid);
        this.getMealplans(uid);
        this.getMeasurements(uid);
        this.getFollowUps(uid);
        this.checkReadMore(user);
      }, 200);
    });
  }

  getSpecialist(sID: string) {
    this.specialistService.getSpecialistData(sID).subscribe(specialist => this.specialist = specialist);
  }

  getGuidelines(uid) {
    this.guidelinesCol = this.afs.collection('guidelines', ref => ref.where('clientID', '==', `${uid}`));
    this.guidelinesCol.valueChanges().subscribe(guidelines => {
      if (guidelines.length > 0) {
        this.hasGuidelines = true;
      }
      this.guidelines = guidelines;
    });
  }

  getMealplans(uid) {
    this.mealplansCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${uid}`));
    this.mealplansCol.valueChanges().subscribe(mealplans => {
      if (mealplans.length > 0) {
        this.hasMealplans = true;
      }
      this.mealplans = mealplans;
    });
  }

  getMeasurements(uid) {
    this.measurementCol = this.afs.collection('measurements', ref => ref.where('clientID', '==', `${uid}`).orderBy('created', 'asc'));
    this.measurementCol.valueChanges().subscribe(measurements => {
      this.measurements = measurements;
    });
  }

  getFollowUps(uid) {
    console.log(uid);
    this.followUpCol = this.afs.collection('follow-ups', ref => ref.where('clientID', '==', `${uid}`).orderBy('creationDate', 'asc'));
    this.followUpCol.valueChanges().subscribe(followUps => {
      this.followUps = followUps;
    });
  }

  // Toggles

  aboutExtendedOpen() {
    this.aboutExtended = true;
    this.cdr.detectChanges();
  }

  aboutExtendedClose() {
    this.aboutExtended = false;
    this.cdr.detectChanges();
  }

  // Checkers
  checkReadMore(user) {
    if (user.basicData.mainGoal.length > 50) {
      console.log(user.basicData.mainGoal.length);
      this.hasReadMore = true;
    } else {
      this.hasReadMore = false;
    }
  }

  // Like this to avoid State Changed Error
  // Open/closers

  get editShow(): boolean {
    return this.userService.editShow;
  }

  toggleEdit() {
    this.userService.toggleEdit();
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
