import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../../../user/user.service';
import { User } from '../../../../user/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../../../../core/auth/auth.service';
import { Review } from './../../../../reviews/review.model';

@Component({
  selector: 'app-my-review-list',
  templateUrl: './my-review-list.component.html',
  styleUrls: ['./my-review-list.component.scss']
})
export class MyReviewListComponent implements OnInit, OnDestroy {
  specialist: User;
  specialist$: Subscription;
  myReviews: Observable<Review[]>;
  myReviewsCol: AngularFirestoreCollection<Review>;

  constructor( private userService: UserService,
               private afs: AngularFirestore,
               private auth: AuthService) { }

  ngOnInit() {
    this.specialist$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      this.myReviewsCol = this.afs.collection('reviews', ref => ref.where('specialistID', '==', `${user.uid}`));
      this.myReviews = this.myReviewsCol.valueChanges();
    });
  }

  ngOnDestroy() {
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
  }

}
