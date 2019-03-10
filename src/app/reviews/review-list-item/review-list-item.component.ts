import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Review } from '../review.model';
import { openClose } from './../../core/animations/open-close.animation';

@Component({
  selector: 'app-review-list-item',
  animations: [
    openClose
  ],
  templateUrl: './review-list-item.component.html',
  styleUrls: ['./review-list-item.component.scss']
})
export class ReviewListItemComponent implements OnInit {
  @Input() review: Review;
  textOpened = false;
  constructor( private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  toggleReviewText() {
    this.textOpened = !this.textOpened;
    this.cdr.detectChanges();
  }

}
