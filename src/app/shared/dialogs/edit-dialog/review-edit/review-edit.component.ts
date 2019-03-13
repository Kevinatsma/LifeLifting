import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Review } from './../../../../reviews/review.model';
import { openClose } from './../../../../core/animations/open-close.animation';
import { ReviewsService } from './../../../../reviews/reviews.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-review-edit',
  animations: [
    openClose
  ],
  templateUrl: './review-edit.component.html',
  styleUrls: ['./../../../../reviews/review-list-item/review-list-item.component.scss']
})
export class ReviewEditComponent implements OnInit {
  @Input() review: Review;
  textOpened = false;
  editReviewForm: FormGroup;

  constructor( private cdr: ChangeDetectorRef,
               public fb: FormBuilder,
               private reviewService: ReviewsService) { }

  ngOnInit() {
    this.editReviewForm = this.fb.group({
      reviewText: '' || this.review.reviewText
    });
  }

  // Getters
  get editActive() {
    return this.reviewService.editShow;
  }

  updateReview(review) {
    const data = {
      reviewText: this.editReviewForm.get('reviewText').value || review.reviewText
    };
    const id = review.reviewID;
    console.log(id);
    this.reviewService.updateReview(id, data);
  }

}
