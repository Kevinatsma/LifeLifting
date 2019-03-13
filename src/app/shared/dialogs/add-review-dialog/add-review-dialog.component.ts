import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ReviewsService } from './../../../reviews/reviews.service';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss']
})
export class AddReviewDialogComponent implements OnInit {
  hide = true;
  reviewForm: FormGroup;
  amountOfCharacters: any;

  constructor( private fb: FormBuilder,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private reviewService: ReviewsService
    ) {
    }

  ngOnInit() {
    this.reviewForm = this.fb.group({
      reviewText: ['', [Validators.required, Validators.minLength(200)]],
    });
  }

  // Getters

  get reviewText() {
    return this.reviewForm.get('reviewText');
  }

  // Add Review
  addReview() {
    const reviewID = `${this.data.clientID}_${this.data.specialist.specialistID}`;
    const data = {
      reviewID: reviewID,
      createdAt: new Date(),
      specialistID: this.data.specialist.uid,
      reviewerID: this.data.clientID,
      reviewerPhoto: this.data.clientPhoto,
      reviewerCountry: this.data.clientCountry,
      reviewerName: this.data.displayName,
      reviewText: this.reviewForm.get('reviewText').value,
    };
    this.reviewService.addReview(data);
  }
}
