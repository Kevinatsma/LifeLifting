import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { User } from '../../../../user/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../user/user.service';
import { Specialist } from '../../../../specialists/specialist.model';
import { SpecialistService } from '../../../../specialists/specialist.service';
import { ChatThreadService } from '../../../../chat/chat-thread.service';
import { Subject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddMealDialogComponent } from './../../../../shared/dialogs/add-meal-dialog/add-meal-dialog.component';
import { AddGuideDialogComponent } from './../../../../shared/dialogs/add-guide-dialog/add-guide-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Guideline } from './../../../../guidelines/guideline.model';


@Component({
  selector: 'app-my-client-detail',
  templateUrl: './my-client-detail.component.html',
  styleUrls: ['./my-client-detail.component.scss']
})
export class MyClientDetailComponent implements OnInit {
  user: User;
  specialist: Specialist;
  guidelinesCol: AngularFirestoreCollection<Guideline>;
  guidelines: Observable<Guideline[]>;
  reviewsVisible = true;
  actionMenuOpen: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();


  // specialist = Observable<Specialist>;

  constructor( private afs: AngularFirestore,
               private cdr: ChangeDetectorRef,
               public route: ActivatedRoute,
               public userService: UserService,
               public specialistService: SpecialistService,
               public threadService: ChatThreadService,
               public location: Location,
               public dialog: MatDialog) {
    this.editStateChange.subscribe((value) => {
      this.actionMenuOpen = value;
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      const sID  = this.user.specialist;
      console.log(sID);
      this.getSpecialist(sID);
      this.getGuidelines(user.uid);
    });
  }

  getSpecialist(sID: string) {
    this.specialistService.getSpecialistData(sID).subscribe(specialist => (this.specialist = specialist));
  }

  getGuidelines(uid) {
    this.guidelinesCol = this.afs.collection('guidelines', ref => ref.where('clientID', '==', `${uid}`));
    this.guidelines = this.guidelinesCol.valueChanges();
  }

  // Like this to avoid State Changed Error
  // Open/closers

  toggleButtonMenu() {
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(button => {
      button.classList.toggle('visible');
    });
    this.editStateChange.next(!this.actionMenuOpen);
    console.log(this.actionMenuOpen);
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
    this.dialog.open(AddMealDialogComponent, {
        data: {
          uid: this.user.uid,
        },
    });
  }

  openGuideDialog() {
    // Set data for Dialog
    this.dialog.open(AddGuideDialogComponent, {
      data: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        currentWeight: this.user.basicData.currentWeight
      },
    });
  }

  // chat() {
  //   const profileId = this.route.snapshot.paramMap.get('id');
  //   console.log('hello');
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
