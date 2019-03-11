import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Review } from '../review.model';
import { openClose } from './../../core/animations/open-close.animation';
import { ReviewsService } from '../reviews.service';
import { EditDialogComponent } from './../../shared/dialogs/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material';
import { Specialist } from './../../specialists/specialist.model';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';

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
  @Input() specialist: Specialist;
  textOpened = false;

  constructor( private cdr: ChangeDetectorRef,
               public dialog: MatDialog,
               private reviewService: ReviewsService) { }

  ngOnInit() {
  }

  // Getters
  get editActive() {
    return this.reviewService.editShow;
  }

  // Toggles

  toggleEditState() {
    this.reviewService.toggleEdit();
    this.cdr.detectChanges();
  }

  toggleReviewText() {
    this.textOpened = !this.textOpened;
    this.cdr.detectChanges();
  }

  // Open dialog
  openEditDialog(review, specialist) {
    const sName = specialist.firstName + ' ' + specialist.lastName;
    // Set data for Dialog
    this.dialog.open(EditDialogComponent, {
        data: {
          review: review,
          specialistName: sName
        },
        panelClass: 'review-dialog'
    });
  }

  deleteReviewDialog(review) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        reviewID: review.reviewID
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = review.reviewID;
        this.reviewService.deleteReview(id);
      } else if (result === false) {
        return null;
      }
    });
  }

}
