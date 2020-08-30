import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Review } from '../review.model';
import { openClose } from './../../core/animations/open-close.animation';
import { ReviewsService } from '../reviews.service';
import { EditDialogComponent } from './../../shared/dialogs/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Specialist } from './../../specialists/specialist.model';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-list-item',
  animations: [
    openClose
  ],
  templateUrl: './review-list-item.component.html',
  styleUrls: ['./review-list-item.component.scss']
})
export class ReviewListItemComponent implements OnInit, OnDestroy {
  @Input() review: Review;
  @Input() specialist: Specialist;
  textOpened = false;
  user: User;
  user$: Subscription;

  constructor( public auth: AuthService,
               private userService: UserService,
               private cdr: ChangeDetectorRef,
               public dialog: MatDialog,
               private reviewService: ReviewsService) { }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  // Getters
  get editActive() {
    return this.reviewService.editShow;
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
    });
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
    // const sName = specialist.firstName + ' ' + specialist.lastName;
    // Set data for Dialog
    this.dialog.open(EditDialogComponent, {
        data: {
          review: review,
          // specialistName: sName
        },
        panelClass: 'review-dialog'
    });
  }

  deleteReviewDialog(review) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        reviewID: review.reviewID
      },
      panelClass: 'confirm-dialog'
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
