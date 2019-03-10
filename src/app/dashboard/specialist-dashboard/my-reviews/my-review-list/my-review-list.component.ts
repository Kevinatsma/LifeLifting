import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../../user/user.service';
import { User } from '../../../../user/user.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Specialist } from '../../../../specialists/specialist.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { Review } from './../../../../reviews/review.model';

@Component({
  selector: 'app-my-review-list',
  templateUrl: './my-review-list.component.html',
  styleUrls: ['./my-review-list.component.scss']
})
export class MyReviewListComponent implements OnInit {
  specialist: User;
  // review: Review;
  myReviews: Observable<Review[]>;
  myReviewsCol: AngularFirestoreCollection<Review>;

  constructor( private userService: UserService,
               private afs: AngularFirestore,
               private auth: AuthService) { }

  ngOnInit() {
    this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      this.myReviewsCol = this.afs.collection('reviews', ref => ref.where('specialistID', '==', `${user.uid}`));
      this.myReviews = this.myReviewsCol.valueChanges();
    });
    // this.myClients = this.userService.getMyClients();
  }

}
