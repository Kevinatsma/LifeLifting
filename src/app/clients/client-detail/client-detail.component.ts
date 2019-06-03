import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { User } from '../../user/user.model';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../client.service';
import { Specialist } from './../../specialists/specialist.model';
import { SpecialistService } from './../../specialists/specialist.service';
import { ChatThreadService } from './../../chat/chat-thread.service';
import { Guideline } from './../../guidelines/guideline.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Mealplan } from './../../mealplans/mealplan.model';
import { Measurement } from './../../measurement/measurement.model';


@Component({
  selector: 'app-user-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss', './../../dashboard/specialist-dashboard/my-clients/my-clients.component.scss']
})
export class ClientDetailComponent implements OnInit {
  user: User;
  specialist: Specialist;
  guidelinesCol: AngularFirestoreCollection<Guideline>;
  guidelines: Guideline[];
  mealplansCol: AngularFirestoreCollection<Mealplan>;
  mealplans: Mealplan[];
  measurementCol: AngularFirestoreCollection<Measurement>;
  measurements: Measurement[];
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

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      const sID  = this.user.specialist;
      this.getSpecialist(sID);
      this.getGuidelines(user.uid);
      this.getMealplans(user.uid);
      this.getMeasurements(user.uid);
      this.checkReadMore(user);
    });
  }

  getSpecialist(sID: string) {
    this.specialistService.getSpecialistData(sID).subscribe(specialist => this.specialist =  specialist);
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

  // Checkers
  checkReadMore(user) {
    if (user.basicData.mainGoal.length > 50) {
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
