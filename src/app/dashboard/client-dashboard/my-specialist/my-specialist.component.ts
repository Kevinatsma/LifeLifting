import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Specialist } from '../../../specialists/specialist.model';
import { ActivatedRoute } from '@angular/router';
import { SpecialistService } from '../../../specialists/specialist.service';
import { Observable } from 'rxjs';
import { ChatThreadService } from '../../../chat/chat-thread.service';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user.model';
import { AddReviewDialogComponent } from '../../../shared/dialogs/add-review-dialog/add-review-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../../core/auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Review } from '../../../reviews/review.model';


@Component({
  selector: 'app-my-specialist',
  templateUrl: './my-specialist.component.html',
  styleUrls: ['./my-specialist.component.scss']
})
export class MySpecialistComponent implements OnInit {
  user: User;
  specialist: Specialist;
  mySpecialistActive = true;
  aboutExtended = false;
  reviewsVisible = true;
  reviews: Observable<Review[]>;
  reviewsCol: AngularFirestoreCollection<Review>;

  // specialist = Observable<MySpecialist>;

  constructor( private auth: AuthService,
               private afs: AngularFirestore,
               private cdr: ChangeDetectorRef,
               public dialog: MatDialog,
               public route: ActivatedRoute,
               private userService: UserService,
               public specialistService: SpecialistService,
               private threadService: ChatThreadService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getUser();
  }

  // Getters
  getUser() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      this.getMySpecialist(user);
    });
  }

  getMySpecialist(user) {
    const id = this.route.snapshot.paramMap.get('id') || user.specialist;
    this.specialistService.getSpecialistData(id).subscribe(specialist => {
      this.specialist = specialist;
      this.reviewsCol = this.afs.collection('reviews', ref => ref.where('specialistID', '==', `${specialist.uid}`));
      this.reviews = this.reviewsCol.valueChanges();
      });
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
    return this.specialistService.editShow;
  }

  toggleEdit() {
      this.specialistService.toggleEdit();
  }

  // Review functions

  openReviews() {
    this.reviewsVisible = true;
    this.cdr.detectChanges();
  }

  closeReviews() {
    this.reviewsVisible = false;
    this.cdr.detectChanges();
  }

  openReviewDialog() {
    // Set data for Dialog
    this.dialog.open(AddReviewDialogComponent, {
        data: {
          displayName: this.user.displayName,
          clientID: this.user.uid,
          clientPhoto: this.user.photoURL,
          clientCountry: this.user.basicData.country,
          specialist: this.specialist
        },
        panelClass: 'review-dialog'
    });
  }


  chat() {
    const profileId = this.specialist.uid;
    return this.threadService.createThread(profileId);
  }

  // Back Button

  goBack() {
    return this.location.back();
  }
}
