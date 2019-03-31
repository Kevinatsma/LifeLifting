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
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  // specialist: Specialist;
  guidelinesCol: AngularFirestoreCollection<Guideline>;
  guidelines: Observable<Guideline[]>;
  mealplansCol: AngularFirestoreCollection<Mealplan>;
  mealplans: Observable<Mealplan[]>;
  mealPlansActive = false;
  aboutExtended = false;
  reviewsVisible = true;


  specialist: Specialist;

  constructor( private afs: AngularFirestore,
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
      }, 200);
    });
  }

  getSpecialist(sID: string) {
    this.specialistService.getSpecialistData(sID).subscribe(specialist => this.specialist = specialist);
  }

  getGuidelines(uid) {
    this.guidelinesCol = this.afs.collection('guidelines', ref => ref.where('clientID', '==', `${uid}`));
    this.guidelines = this.guidelinesCol.valueChanges();
  }

  getMealplans(uid) {
    this.mealplansCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${uid}`));
    this.mealplans = this.mealplansCol.valueChanges();
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

  // chat() {
  //   const profileId = this.route.snapshot.paramMap.get('id');
  //   return this.threadService.createThread(profileId)
  //     .then(() => console.log('Thread Created!'))
  //     .catch(error => console.log(error.message));
  // }

  chat() {
    const profileId = this.user.uid;
    return this.threadService.createThread(profileId);
  }

  // Back Button

  goBack() {
    return this.location.back();
  }
}
