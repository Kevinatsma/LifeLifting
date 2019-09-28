import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { Review } from './review.model';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  reviewCol: AngularFirestoreCollection<Review>;
  reviews: Observable<Review[]>;
  reviewDoc: AngularFirestoreDocument<Review>;
  review: Observable<Review>;

  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( private afs: AngularFirestore,
               public snackBar: MatSnackBar,
             ) {
    this.reviewCol = this.afs.collection<Review>(`reviews`);
    this.reviews = this.getReviews();
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });
  }

  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  getReviewData(id) {
    this.reviewDoc = this.afs.doc<Review>(`reviews/${id}`);
    this.review = this.reviewDoc.valueChanges();
    return this.review;
  }

  getReviews() {
    this.reviews = this.reviewCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Review;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.reviews;
  }

  getSpecificReviews(condition, value) {
    const reviewCol = this.afs.collection('reviews', ref => ref.where(`${condition}`, '==', `${value}`));
    const reviews$ = reviewCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Review;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return reviews$;
  }

  addReview(data) {
    this.afs.collection<Review>(`reviews`).add(data)
    .then(obj => {
      // Show Snackbar
      const message = `The review was added succesfully`;
      const action = 'Close';

      const updateData = {
        reviewID: obj.id
      };
      setTimeout(() => {
        this.updateReview(obj.id, updateData);
      }, 500);

      this.snackBar.open(message, action, {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    })
    .then((docRef) => {
      const id = docRef;

    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }

  updateReview(id, data) {
    this.reviewDoc = this.afs.doc<Review>(`reviews/${id}`);
    this.reviewDoc.update(data)
      .then(() => {
        // Show Snackbar
        const message = `The Review was updated succesfully`;
        const action = 'Close';

        this.snackBar.open(message, action, {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      })
      .catch(error => console.error(error));
  }

  deleteReview(id) {
    this.reviewDoc = this.afs.doc(`reviews/${id}`);
    this.reviewDoc.delete();
  }
}
