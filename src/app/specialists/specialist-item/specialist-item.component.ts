import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Specialist } from '../specialist.model';
import { Observable } from 'rxjs';
import { Review } from './../../reviews/review.model';
import { ReviewsService } from './../../reviews/reviews.service';

@Component({
  selector: 'app-specialist-item',
  templateUrl: './specialist-item.component.html',
  styleUrls: ['./specialist-item.component.scss']
})
export class SpecialistItemComponent implements OnInit {
  @Input() specialist: Specialist;
  @Output() specialistToShow = new EventEmitter();
  aboutExtended = false;
  reviewsVisible = false;
  reviews: Array<Review>;

  // Toggles
  showSpecialist = false;

  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef,
               private reviewService: ReviewsService) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    setTimeout(() => {
      this.getReviews();
    }, 200);
  }

  aboutExtendedOpen() {
    this.aboutExtended = true;
    this.cdr.detectChanges();
  }

  aboutExtendedClose() {
    this.aboutExtended = false;
    this.cdr.detectChanges();
  }

  getReviews() {
    const condition = 'specialistID';
    const value = this.specialist.uid;
    this.reviewService.getSpecificReviews(condition, value).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  // Like this to avoid State Changed Error
  openReviews() {
    this.reviewsVisible = true;
    this.cdr.detectChanges();
  }

  closeReviews() {
    this.reviewsVisible = false;
    this.cdr.detectChanges();
  }

  // Toggles
  toggleSpecialist(specialist) {
    this.specialistToShow  = specialist;
    this.showSpecialist = true;
  }

  closeSpecialist() {
    this.showSpecialist = false;
  }

}
